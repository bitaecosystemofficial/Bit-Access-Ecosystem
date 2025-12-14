import { useState, useEffect, useMemo } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Gift, ExternalLink, Check, Facebook, Twitter, Youtube, MessageCircle, Star, Github } from 'lucide-react';
import { formatUnits } from 'viem';
import BIT_AIRDROP_ABI from '@/contracts/abis/BITAirdrop.json';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import { AirdropLeaderboard } from './AirdropLeaderboard';
import { supabase } from '@/integrations/supabase/client';

// BIT token has 9 decimals
const BIT_DECIMALS = 9;

// Task IDs matching the smart contract
const TASK_IDS = [
  'facebook-like',
  'twitter-follow',
  'youtube-subscribe',
  'telegram-join',
  'facebook-review',
  'google-review',
  'trustpilot-review',
  'github-visit'
] as const;

interface Task {
  id: string;
  title: string;
  description: string;
  icon: any;
  link: string;
  color: string;
}

export function AirdropTab() {
  const { address } = useAccount();
  const { toast } = useToast();
  
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Read user progress from contract
  const { data: progressData, refetch: refetchProgress } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_AIRDROP,
    abi: BIT_AIRDROP_ABI,
    functionName: 'getUserProgress',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  // Read all task statuses in one call using getTaskStatus
  const { data: taskStatusData, refetch: refetchTaskStatus } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_AIRDROP,
    abi: BIT_AIRDROP_ABI,
    functionName: 'getTaskStatus',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  // Read leaderboard stats from contract
  const { data: leaderboardStats } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_AIRDROP,
    abi: BIT_AIRDROP_ABI,
    functionName: 'getLeaderboardStats',
  });

  // Read reward constants from contract
  const { data: rewardConstants } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_AIRDROP,
    abi: BIT_AIRDROP_ABI,
    functionName: 'getRewardConstants',
  });

  const tasks: Task[] = [
    {
      id: 'facebook-like',
      title: 'Like Us on Facebook',
      description: 'Like our Facebook page',
      icon: Facebook,
      link: 'https://facebook.com/bitaccess',
      color: 'text-blue-600'
    },
    {
      id: 'twitter-follow',
      title: 'Follow on Twitter',
      description: 'Follow our Twitter page',
      icon: Twitter,
      link: 'https://twitter.com/bitaccess',
      color: 'text-sky-500'
    },
    {
      id: 'youtube-subscribe',
      title: 'Subscribe to YouTube',
      description: 'Subscribe to our YouTube channel',
      icon: Youtube,
      link: 'https://youtube.com/@bitaccess',
      color: 'text-red-600'
    },
    {
      id: 'telegram-join',
      title: 'Join Telegram Group',
      description: 'Join our Telegram community',
      icon: MessageCircle,
      link: 'https://t.me/bitaccess',
      color: 'text-blue-500'
    },
    {
      id: 'facebook-review',
      title: 'Leave Facebook Review',
      description: 'Leave us a review on Facebook',
      icon: Star,
      link: 'https://facebook.com/bitaccess/reviews',
      color: 'text-blue-600'
    },
    {
      id: 'google-review',
      title: 'Leave Google Review',
      description: 'Leave us a review on Google',
      icon: Star,
      link: 'https://g.page/bitaccess/review',
      color: 'text-yellow-600'
    },
    {
      id: 'trustpilot-review',
      title: 'Leave Trustpilot Review',
      description: 'Leave us a review on Trustpilot',
      icon: Star,
      link: 'https://trustpilot.com/review/bitaccess.io',
      color: 'text-green-600'
    },
    {
      id: 'github-visit',
      title: 'Visit our GitHub Repo',
      description: 'Star our GitHub repository',
      icon: Github,
      link: 'https://github.com/bitaccess',
      color: 'text-gray-900 dark:text-gray-100'
    }
  ];

  // Parse task status from contract response
  const completedTasks = useMemo(() => {
    const completed = new Set<string>();
    if (taskStatusData && Array.isArray(taskStatusData)) {
      (taskStatusData as boolean[]).forEach((isCompleted, index) => {
        if (isCompleted && TASK_IDS[index]) {
          completed.add(TASK_IDS[index]);
        }
      });
    }
    return completed;
  }, [taskStatusData]);

  // Parse progress data with correct 9 decimals
  const { totalRewards, remainingUnclaimed, tasksCompleted, canClaim, alreadyClaimed } = useMemo(() => {
    if (!progressData) {
      return {
        totalRewards: 0,
        remainingUnclaimed: 2000,
        tasksCompleted: 0,
        canClaim: false,
        alreadyClaimed: false
      };
    }
    
    const [completed, rewards, unclaimed, claimed, canClaimFlag] = progressData as [bigint, bigint, bigint, boolean, boolean];
    
    return {
      totalRewards: Number(formatUnits(rewards, BIT_DECIMALS)),
      remainingUnclaimed: Number(formatUnits(unclaimed, BIT_DECIMALS)),
      tasksCompleted: Number(completed),
      canClaim: canClaimFlag,
      alreadyClaimed: claimed
    };
  }, [progressData]);

  // Parse reward constants
  const rewardPerTask = useMemo(() => {
    if (!rewardConstants) return 250;
    const [perTask] = rewardConstants as [bigint, bigint, bigint];
    return Number(formatUnits(perTask, BIT_DECIMALS));
  }, [rewardConstants]);

  const handleTaskClick = async (task: Task) => {
    if (!address) {
      toast({ title: "Error", description: "Please connect your wallet", variant: "destructive" });
      return;
    }

    if (completedTasks.has(task.id)) {
      toast({ title: "Info", description: "You've already completed this task" });
      return;
    }

    // Open link in new tab
    window.open(task.link, '_blank');

    // Mark task as completed on blockchain
    try {
      writeContract({
        address: CONTRACT_ADDRESSES.BIT_AIRDROP,
        abi: BIT_AIRDROP_ABI,
        functionName: 'completeTask',
        args: [task.id],
      } as any);

      toast({
        title: "Task Visited",
        description: "Marking task as completed...",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to complete task",
        variant: "destructive",
      });
    }
  };

  const handleClaimAirdrop = async () => {
    if (!address) {
      toast({ title: "Error", description: "Please connect your wallet", variant: "destructive" });
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESSES.BIT_AIRDROP,
        abi: BIT_AIRDROP_ABI,
        functionName: 'claimAirdrop',
      } as any);

      toast({
        title: "Claiming Airdrop",
        description: "Transaction submitted. Waiting for confirmation...",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to claim airdrop",
        variant: "destructive",
      });
    }
  };

  // Refetch data and sync with database when transaction completes
  useEffect(() => {
    if (isConfirmed && address) {
      refetchProgress();
      refetchTaskStatus();
      
      // Update leaderboard stats in database for real-time sync
      const updateLeaderboard = async () => {
        try {
          const { error } = await supabase
            .from('leaderboard_stats')
            .upsert({
              wallet_address: address.toLowerCase(),
              tasks_completed: tasksCompleted + 1,
              total_rewards: (tasksCompleted + 1) * rewardPerTask,
              claimed: alreadyClaimed,
              last_activity_at: new Date().toISOString(),
            }, { onConflict: 'wallet_address' });
          
          if (error) console.error('Error updating leaderboard:', error);
        } catch (err) {
          console.error('Error syncing leaderboard:', err);
        }
      };
      
      updateLeaderboard();

      toast({
        title: "Success",
        description: "Transaction confirmed successfully!",
      });
    }
  }, [isConfirmed, address, refetchProgress, refetchTaskStatus, tasksCompleted, rewardPerTask, alreadyClaimed, toast]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total BIT Rewards</CardDescription>
            <CardTitle className="text-3xl text-primary">{totalRewards.toLocaleString()} BIT</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Remaining Unclaimed</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">{remainingUnclaimed.toLocaleString()} BIT</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Tasks Completed</CardDescription>
            <CardTitle className="text-3xl text-secondary">{tasksCompleted} / {tasks.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Airdrop Tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <CardTitle>Complete Tasks to Earn BIT Tokens</CardTitle>
          </div>
          <CardDescription>
            Complete all tasks to unlock your {(rewardPerTask * 8).toLocaleString()} BIT airdrop reward ({rewardPerTask.toLocaleString()} BIT per task)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => {
              const Icon = task.icon;
              const isCompleted = completedTasks.has(task.id);
              
              return (
                <Card key={task.id} className="border-border hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className={`h-6 w-6 ${task.color}`} />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-primary">+{rewardPerTask.toLocaleString()} BIT</span>
                            {isCompleted ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <Check className="h-4 w-4" />
                                <span className="text-sm">Completed</span>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleTaskClick(task)}
                                disabled={isPending || isConfirming}
                              >
                                Visit <ExternalLink className="h-3 w-3 ml-1" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Claim Button */}
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              onClick={handleClaimAirdrop}
              disabled={!canClaim || alreadyClaimed || isPending || isConfirming}
              className="min-w-[200px]"
            >
              {alreadyClaimed ? 'Airdrop Claimed' : isPending || isConfirming ? 'Processing...' : 'Claim Airdrop'}
            </Button>
          </div>
          
          {!canClaim && !alreadyClaimed && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              Complete all tasks to unlock claim button
            </p>
          )}
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <AirdropLeaderboard />
    </div>
  );
}
