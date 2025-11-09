import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Gift, ExternalLink, Check, Facebook, Twitter, Youtube, MessageCircle, Star } from 'lucide-react';
import { formatEther } from 'viem';

const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual deployed address
const BIT_AIRDROP_ABI = await import('@/contracts/abis/BITAirdrop.json').then(m => m.default);

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
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  // Read user progress from contract
  const { data: progressData, refetch: refetchProgress } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BIT_AIRDROP_ABI,
    functionName: 'getUserProgress',
    args: address ? [address] : undefined,
  });

  const tasks: Task[] = [
    {
      id: 'facebook-like',
      title: 'Like Us on Facebook',
      description: 'Like our Facebook page',
      icon: Facebook,
      link: 'https://facebook.com', // Replace with actual link
      color: 'text-blue-600'
    },
    {
      id: 'twitter-follow',
      title: 'Follow on Twitter',
      description: 'Follow our Twitter page',
      icon: Twitter,
      link: 'https://twitter.com', // Replace with actual link
      color: 'text-sky-500'
    },
    {
      id: 'youtube-subscribe',
      title: 'Subscribe to YouTube',
      description: 'Subscribe to our YouTube channel',
      icon: Youtube,
      link: 'https://youtube.com', // Replace with actual link
      color: 'text-red-600'
    },
    {
      id: 'telegram-join',
      title: 'Join Telegram Group',
      description: 'Join our Telegram community',
      icon: MessageCircle,
      link: 'https://t.me', // Replace with actual link
      color: 'text-blue-500'
    },
    {
      id: 'facebook-review',
      title: 'Leave Facebook Review',
      description: 'Leave us a review on Facebook',
      icon: Star,
      link: 'https://facebook.com', // Replace with actual link
      color: 'text-blue-600'
    },
    {
      id: 'google-review',
      title: 'Leave Google Review',
      description: 'Leave us a review on Google',
      icon: Star,
      link: 'https://google.com', // Replace with actual link
      color: 'text-yellow-600'
    },
    {
      id: 'trustpilot-review',
      title: 'Leave Trustpilot Review',
      description: 'Leave us a review on Trustpilot',
      icon: Star,
      link: 'https://trustpilot.com', // Replace with actual link
      color: 'text-green-600'
    }
  ];

  useEffect(() => {
    if (progressData) {
      // Fetch which tasks are completed
      const fetchTaskStatus = async () => {
        const completed = new Set<string>();
        for (const task of tasks) {
          try {
            const isCompleted = await checkTaskCompleted(task.id);
            if (isCompleted) {
              completed.add(task.id);
            }
          } catch (error) {
            console.error(`Error checking task ${task.id}:`, error);
          }
        }
        setCompletedTasks(completed);
      };
      fetchTaskStatus();
    }
  }, [progressData, address]);

  const checkTaskCompleted = async (taskId: string): Promise<boolean> => {
    if (!address) return false;
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/read-contract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress: CONTRACT_ADDRESS,
          abi: BIT_AIRDROP_ABI,
          functionName: 'isTaskCompleted',
          args: [address, taskId]
        })
      });
      const data = await response.json();
      return data.result || false;
    } catch {
      return false;
    }
  };

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

    // Mark task as completed (no gas fee)
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
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
        address: CONTRACT_ADDRESS as `0x${string}`,
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

  useEffect(() => {
    if (hash) {
      refetchProgress();
    }
  }, [hash]);

  const totalRewards = progressData ? Number(formatEther(progressData[1] as bigint)) : 0;
  const remainingUnclaimed = progressData ? Number(formatEther(progressData[2] as bigint)) : 700;
  const tasksCompleted = progressData ? Number(progressData[0]) : 0;
  const canClaim = progressData ? Boolean(progressData[4]) : false;
  const alreadyClaimed = progressData ? Boolean(progressData[3]) : false;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total BIT Rewards</CardDescription>
            <CardTitle className="text-3xl text-primary">{totalRewards.toFixed(0)} BIT</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Remaining Unclaimed</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">{remainingUnclaimed.toFixed(0)} BIT</CardTitle>
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
            Complete all tasks to unlock your 700 BIT airdrop reward (100 BIT per task)
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
                            <span className="text-sm font-medium text-primary">+100 BIT</span>
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
    </div>
  );
}
