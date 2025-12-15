import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits } from 'viem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, Clock, Gift, Flame, Trophy, Users, Coins } from 'lucide-react';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import { toast } from '@/hooks/use-toast';
import bitTokenIcon from '@/assets/bit-token-icon.png';

const TOKEN_DECIMALS = 9;

export const DailyCheckTab = () => {
  const { address, isConnected } = useAccount();
  const [countdown, setCountdown] = useState<string>('');

  // Read user status from contract
  const { data: userStatus, refetch: refetchUserStatus } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_DAILY_CHECKIN,
    abi: CONTRACT_ABIS.BIT_DAILY_CHECKIN,
    functionName: 'getUserStatus',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Read user check-in days
  const { data: checkinDays, refetch: refetchCheckinDays } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_DAILY_CHECKIN,
    abi: CONTRACT_ABIS.BIT_DAILY_CHECKIN,
    functionName: 'getUserCheckinDays',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Read contract stats
  const { data: contractStats } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_DAILY_CHECKIN,
    abi: CONTRACT_ABIS.BIT_DAILY_CHECKIN,
    functionName: 'getContractStats',
  });

  // Check-in transaction
  const { writeContract: doCheckin, data: checkinHash, isPending: isCheckinPending } = useWriteContract();

  const { isLoading: isCheckinConfirming, isSuccess: isCheckinSuccess } = useWaitForTransactionReceipt({
    hash: checkinHash,
  });

  // Parse user status
  const totalCheckins = userStatus ? Number(userStatus[0]) : 0;
  const lastCheckinTime = userStatus ? Number(userStatus[1]) : 0;
  const currentStreak = userStatus ? Number(userStatus[2]) : 0;
  const longestStreak = userStatus ? Number(userStatus[3]) : 0;
  const totalRewardsClaimed = userStatus ? userStatus[4] : BigInt(0);
  const remainingCheckins = userStatus ? Number(userStatus[5]) : 45;
  const nextCheckinTime = userStatus ? Number(userStatus[6]) : 0;
  const canCheckin = userStatus ? userStatus[7] : true;

  // Parse contract stats
  const totalParticipants = contractStats ? Number(contractStats[0]) : 0;
  const globalCheckinsCompleted = contractStats ? Number(contractStats[1]) : 0;
  const globalRewardsDistributed = contractStats ? contractStats[2] : BigInt(0);

  // Progress percentage
  const progressPercent = (totalCheckins / 45) * 100;

  // Countdown timer
  useEffect(() => {
    if (!canCheckin && nextCheckinTime > 0) {
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const remaining = nextCheckinTime - now;
        
        if (remaining <= 0) {
          setCountdown('Ready!');
          refetchUserStatus();
        } else {
          const hours = Math.floor(remaining / 3600);
          const minutes = Math.floor((remaining % 3600) / 60);
          const seconds = remaining % 60;
          setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      setCountdown('Ready!');
    }
  }, [canCheckin, nextCheckinTime, refetchUserStatus]);

  // Handle check-in success
  useEffect(() => {
    if (isCheckinSuccess) {
      toast({
        title: "Check-in Successful!",
        description: "You've claimed 200 BIT tokens!",
      });
      refetchUserStatus();
      refetchCheckinDays();
    }
  }, [isCheckinSuccess, refetchUserStatus, refetchCheckinDays]);

  const handleCheckin = () => {
    if (!isConnected || !canCheckin) return;

    try {
      doCheckin({
        address: CONTRACT_ADDRESSES.BIT_DAILY_CHECKIN,
        abi: CONTRACT_ABIS.BIT_DAILY_CHECKIN,
        functionName: 'checkin',
      } as any);
    } catch (error) {
      console.error('Check-in error:', error);
      toast({
        title: "Check-in Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatBIT = (value: bigint) => {
    return Number(formatUnits(value, TOKEN_DECIMALS)).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{totalCheckins}/45</p>
            <p className="text-xs text-muted-foreground">Days Checked</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
            <p className="text-xs text-muted-foreground">Current Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">Best Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <img src={bitTokenIcon} alt="BIT" className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{formatBIT(totalRewardsClaimed)}</p>
            <p className="text-xs text-muted-foreground">BIT Claimed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Check-in Card */}
      <Card className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-primary" />
            Daily Check-in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{totalCheckins}/45 Days</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <p className="text-xs text-muted-foreground text-center">
              {remainingCheckins} days remaining • 200 BIT per check-in
            </p>
          </div>

          {/* Check-in Button */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className={`text-lg font-mono ${canCheckin ? 'text-green-500' : 'text-muted-foreground'}`}>
                {countdown}
              </span>
            </div>

            <Button
              size="lg"
              onClick={handleCheckin}
              disabled={!canCheckin || isCheckinPending || isCheckinConfirming || totalCheckins >= 45}
              className="w-full md:w-auto px-12 py-6 text-lg bg-primary hover:bg-primary/90"
            >
              {isCheckinPending || isCheckinConfirming ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : totalCheckins >= 45 ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  All Check-ins Complete!
                </span>
              ) : canCheckin ? (
                <span className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Check In & Claim 200 BIT
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Come Back Tomorrow
                </span>
              )}
            </Button>

            <p className="text-xs text-muted-foreground">
              Only gas fees required • No claiming fees
            </p>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Check-in Calendar</h4>
            <div className="grid grid-cols-9 gap-2">
              {Array.from({ length: 45 }, (_, i) => {
                const isCompleted = checkinDays ? checkinDays[i] : false;
                const isCurrent = i === totalCheckins;
                
                return (
                  <div
                    key={i}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-xs font-medium
                      transition-all duration-200
                      ${isCompleted 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                        : isCurrent 
                          ? 'bg-primary/20 border-2 border-primary border-dashed text-primary animate-pulse'
                          : 'bg-secondary/50 text-muted-foreground'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Stats */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Global Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{totalParticipants.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Participants</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{globalCheckinsCompleted.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Check-ins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{formatBIT(globalRewardsDistributed)}</p>
              <p className="text-xs text-muted-foreground">BIT Distributed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Coins className="w-5 h-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-medium">How Daily Check-in Works</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check in once every 24 hours to claim 200 BIT</li>
                <li>• Complete all 45 days to earn 9,000 BIT total</li>
                <li>• Build streaks for consecutive check-ins</li>
                <li>• Only gas fees required, no claiming fees</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
