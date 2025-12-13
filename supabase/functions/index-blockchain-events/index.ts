import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Contract addresses - Replace with actual deployed addresses
const BIT_AIRDROP_ADDRESS = "0x0000000000000000000000000000000000000000";
const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";

interface BlockchainEvent {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  logIndex: string;
}

// Keccak256 hash function using crypto.subtle
async function keccak256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting blockchain event indexing...');

    // Calculate block range (last 2000 blocks ~= 10 minutes on BSC)
    const latestBlockResponse = await fetch(BSC_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1
      })
    });

    const latestBlockData = await latestBlockResponse.json();
    const latestBlock = parseInt(latestBlockData.result, 16);
    const fromBlock = Math.max(latestBlock - 2000, 0);

    console.log(`Indexing blocks from ${fromBlock} to ${latestBlock}`);

    // Event signatures matching the updated BITAirdrop.sol contract
    // TaskCompleted(address indexed user, string taskId, uint256 completedCount, uint256 timestamp)
    const taskCompletedTopic = await keccak256('TaskCompleted(address,string,uint256,uint256)');
    
    // AirdropClaimed(address indexed user, uint256 amount, uint256 timestamp)
    const airdropClaimedTopic = await keccak256('AirdropClaimed(address,uint256,uint256)');
    
    // ParticipantJoined(address indexed user, uint256 timestamp)
    const participantJoinedTopic = await keccak256('ParticipantJoined(address,uint256)');

    let taskEventsProcessed = 0;
    let claimEventsProcessed = 0;
    let newParticipants = 0;

    // Fetch TaskCompleted events
    const taskEventsResponse = await fetch(BSC_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [{
          fromBlock: '0x' + fromBlock.toString(16),
          toBlock: '0x' + latestBlock.toString(16),
          address: BIT_AIRDROP_ADDRESS,
          topics: [taskCompletedTopic]
        }],
        id: 2
      })
    });

    const taskEventsData = await taskEventsResponse.json();
    const taskEvents: BlockchainEvent[] = taskEventsData.result || [];

    console.log(`Found ${taskEvents.length} TaskCompleted events`);

    // Process TaskCompleted events
    for (const event of taskEvents) {
      try {
        // User address is indexed (in topics[1])
        const userAddress = '0x' + event.topics[1].slice(26).toLowerCase();
        
        // Decode data: taskId (string), completedCount (uint256), timestamp (uint256)
        // For string, we need to handle ABI encoding
        const data = event.data.slice(2); // Remove 0x prefix
        const completedCount = parseInt(data.slice(128, 192), 16); // Third 32 bytes
        const reward = completedCount * 250; // 250 BIT per task

        // Check if event already exists
        const { data: existingEvent } = await supabase
          .from('airdrop_events')
          .select('id')
          .eq('tx_hash', event.transactionHash)
          .eq('wallet_address', userAddress)
          .eq('event_type', 'task_completed')
          .maybeSingle();

        if (!existingEvent) {
          // Insert new airdrop event
          await supabase
            .from('airdrop_events')
            .insert({
              wallet_address: userAddress,
              event_type: 'task_completed',
              tasks_completed: completedCount,
              total_rewards: reward,
              tx_hash: event.transactionHash,
              claimed: false
            });

          // Update or insert leaderboard stats
          const { data: existingStats } = await supabase
            .from('leaderboard_stats')
            .select('*')
            .eq('wallet_address', userAddress)
            .maybeSingle();

          if (existingStats) {
            await supabase
              .from('leaderboard_stats')
              .update({
                tasks_completed: completedCount,
                total_rewards: reward,
                last_activity_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('wallet_address', userAddress);
          } else {
            await supabase
              .from('leaderboard_stats')
              .insert({
                wallet_address: userAddress,
                tasks_completed: completedCount,
                total_rewards: reward,
                claimed: false,
                last_activity_at: new Date().toISOString()
              });
            newParticipants++;
          }

          taskEventsProcessed++;
          console.log(`Processed TaskCompleted for ${userAddress}, completed: ${completedCount}`);
        }
      } catch (err) {
        console.error('Error processing task event:', err);
      }
    }

    // Fetch AirdropClaimed events
    const claimEventsResponse = await fetch(BSC_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [{
          fromBlock: '0x' + fromBlock.toString(16),
          toBlock: '0x' + latestBlock.toString(16),
          address: BIT_AIRDROP_ADDRESS,
          topics: [airdropClaimedTopic]
        }],
        id: 3
      })
    });

    const claimEventsData = await claimEventsResponse.json();
    const claimEvents: BlockchainEvent[] = claimEventsData.result || [];

    console.log(`Found ${claimEvents.length} AirdropClaimed events`);

    // Process AirdropClaimed events
    for (const event of claimEvents) {
      try {
        const userAddress = '0x' + event.topics[1].slice(26).toLowerCase();
        
        // Decode data: amount (uint256), timestamp (uint256)
        const data = event.data.slice(2);
        const amount = parseInt(data.slice(0, 64), 16);
        const totalReward = amount / 1e18; // Convert from wei (18 decimals)

        // Check if claim event already exists
        const { data: existingClaim } = await supabase
          .from('airdrop_events')
          .select('id')
          .eq('tx_hash', event.transactionHash)
          .eq('event_type', 'airdrop_claimed')
          .maybeSingle();

        if (!existingClaim) {
          // Insert claim event
          await supabase
            .from('airdrop_events')
            .insert({
              wallet_address: userAddress,
              event_type: 'airdrop_claimed',
              tasks_completed: 8, // All tasks completed
              total_rewards: totalReward,
              tx_hash: event.transactionHash,
              claimed: true
            });

          // Update leaderboard stats to mark as claimed
          await supabase
            .from('leaderboard_stats')
            .update({
              claimed: true,
              total_rewards: totalReward,
              tasks_completed: 8,
              last_activity_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('wallet_address', userAddress);

          claimEventsProcessed++;
          console.log(`Processed AirdropClaimed for ${userAddress}, reward: ${totalReward}`);
        }
      } catch (err) {
        console.error('Error processing claim event:', err);
      }
    }

    const summary = {
      success: true,
      blocksIndexed: latestBlock - fromBlock,
      fromBlock,
      toBlock: latestBlock,
      taskEventsProcessed,
      claimEventsProcessed,
      newParticipants,
      timestamp: new Date().toISOString()
    };

    console.log('Indexing complete:', summary);

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error indexing blockchain events:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
