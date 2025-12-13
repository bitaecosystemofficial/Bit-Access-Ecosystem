import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// BIT Airdrop contract ABI for events
const AIRDROP_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "user", "type": "address" },
      { "indexed": true, "name": "taskId", "type": "uint256" },
      { "indexed": false, "name": "reward", "type": "uint256" }
    ],
    "name": "TaskCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "user", "type": "address" },
      { "indexed": false, "name": "totalReward", "type": "uint256" }
    ],
    "name": "AirdropClaimed",
    "type": "event"
  }
];

// Contract addresses
const BIT_AIRDROP_ADDRESS = "0x1234567890123456789012345678901234567890"; // Replace with actual address
const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";

interface BlockchainEvent {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  logIndex: string;
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

    // Get the last processed block from storage or start from recent
    const { data: lastBlock } = await supabase
      .from('leaderboard_stats')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    // Calculate block range (last 1000 blocks or so)
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
    const fromBlock = Math.max(latestBlock - 1000, 0);

    console.log(`Indexing blocks from ${fromBlock} to ${latestBlock}`);

    // TaskCompleted event topic
    const taskCompletedTopic = "0x" + Array.from(
      new Uint8Array(
        await crypto.subtle.digest('SHA-256', new TextEncoder().encode('TaskCompleted(address,uint256,uint256)'))
      )
    ).slice(0, 32).map(b => b.toString(16).padStart(2, '0')).join('');

    // AirdropClaimed event topic
    const airdropClaimedTopic = "0x" + Array.from(
      new Uint8Array(
        await crypto.subtle.digest('SHA-256', new TextEncoder().encode('AirdropClaimed(address,uint256)'))
      )
    ).slice(0, 32).map(b => b.toString(16).padStart(2, '0')).join('');

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
      const userAddress = '0x' + event.topics[1].slice(26).toLowerCase();
      const taskId = parseInt(event.topics[2], 16).toString();
      const reward = parseInt(event.data, 16);

      // Check if event already exists
      const { data: existingEvent } = await supabase
        .from('airdrop_events')
        .select('id')
        .eq('tx_hash', event.transactionHash)
        .eq('task_id', taskId)
        .maybeSingle();

      if (!existingEvent) {
        // Insert new airdrop event
        await supabase
          .from('airdrop_events')
          .insert({
            wallet_address: userAddress,
            event_type: 'task_completed',
            task_id: taskId,
            total_rewards: reward / 1e9, // Convert from wei to BIT (9 decimals)
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
              tasks_completed: existingStats.tasks_completed + 1,
              total_rewards: existingStats.total_rewards + (reward / 1e9),
              last_activity_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('wallet_address', userAddress);
        } else {
          await supabase
            .from('leaderboard_stats')
            .insert({
              wallet_address: userAddress,
              tasks_completed: 1,
              total_rewards: reward / 1e9,
              claimed: false,
              last_activity_at: new Date().toISOString()
            });
        }

        console.log(`Processed TaskCompleted for ${userAddress}, task ${taskId}`);
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
      const userAddress = '0x' + event.topics[1].slice(26).toLowerCase();
      const totalReward = parseInt(event.data, 16);

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
            total_rewards: totalReward / 1e9,
            tx_hash: event.transactionHash,
            claimed: true
          });

        // Update leaderboard stats to mark as claimed
        await supabase
          .from('leaderboard_stats')
          .update({
            claimed: true,
            last_activity_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('wallet_address', userAddress);

        console.log(`Processed AirdropClaimed for ${userAddress}`);
      }
    }

    const summary = {
      success: true,
      blocksIndexed: latestBlock - fromBlock,
      taskEventsProcessed: taskEvents.length,
      claimEventsProcessed: claimEvents.length,
      latestBlock: latestBlock
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
