import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Lock, TrendingUp, Clock, Unlock, AlertTriangle, DollarSign, Wallet, Gift, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import bitLogo from '@/assets/bit-token-logo.png';

interface StakedPosition {
  id: number;
  amount: number;
  poolIndex: number;
  startDate: Date;
  endDate: Date;
  apy: number;
  days: number;
}

const StakingTab = () => {
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const { toast } = useToast();
  const { address } = useAccount();
  const { writeContract, data: hash, isPending: isStaking } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const UNSTAKE_FEE = 2; // 2% fee
  const EARLY_UNSTAKE_FEE = 10; // 10% additional fee for early withdrawal

  // Read BIT token balance
  const { data: bitBalance, refetch: refetchBitBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address }
  });

  // Read BIT token allowance for staking contract
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'allowance',
    args: address ? [address as `0x${string}`, CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`] : undefined,
    query: { enabled: !!address }
  });

  // Read total staked
  const { data: totalUserStaked, refetch: refetchTotalStaked } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'userTotalStaked',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address }
  });

  // Read user stakes
  const { data: userStakes, refetch: refetchUserStakes } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'getUserStakes',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address }
  });

  // Read total rewards
  const { data: totalRewardsData, refetch: refetchRewards } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'getTotalRewards',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address }
  });
  
  useEffect(() => {
    if (isSuccess) {
      refetchBitBalance();
      refetchTotalStaked();
      refetchUserStakes();
      refetchRewards();
      setStakeAmount('');
      setSelectedPool(null);
    }
  }, [isSuccess]);

  const stakingPools = [
    {
      days: 180,
      apy: 12,
      minStake: 100000,
      totalStaked: '1.2M BIT',
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
    },
    {
      days: 240,
      apy: 18,
      minStake: 500000000,
      totalStaked: '3.5M BIT',
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/30',
      popular: true,
    },
    {
      days: 365,
      apy: 25,
      minStake: 1000000,
      totalStaked: '8.9M BIT',
      color: 'from-primary/20 to-primary/5',
      borderColor: 'border-primary/30',
    },
  ];

  const calculateRewards = (amount: string, pool: typeof stakingPools[0]) => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return '0';
    const dailyRate = pool.apy / 100 / 365;
    const totalReward = amt * dailyRate * pool.days;
    return totalReward.toFixed(2);
  };

  const calculateCurrentRewards = (position: StakedPosition) => {
    const now = new Date();
    const daysElapsed = Math.floor((now.getTime() - position.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dailyRate = position.apy / 100 / 365;
    const currentReward = position.amount * dailyRate * daysElapsed;
    return currentReward.toFixed(2);
  };

  const isEarlyUnstake = (position: StakedPosition) => {
    return new Date() < position.endDate;
  };

  const calculateUnstakeFees = (amount: number, isEarly: boolean) => {
    const baseFee = amount * (UNSTAKE_FEE / 100);
    const earlyFee = isEarly ? amount * (EARLY_UNSTAKE_FEE / 100) : 0;
    return {
      baseFee: baseFee.toFixed(2),
      earlyFee: earlyFee.toFixed(2),
      totalFee: (baseFee + earlyFee).toFixed(2),
      netAmount: (amount - baseFee - earlyFee).toFixed(2),
    };
  };

  const handleApprove = async () => {
    if (!address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    setIsApproving(true);
    try {
      const amountToApprove = parseUnits(stakeAmount, 9); // BIT has 9 decimals
      
      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
        abi: CONTRACT_ABIS.BIT_STAKING,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`, amountToApprove],
      } as any);

      toast({
        title: 'Approval Submitted',
        description: 'Please wait for the transaction to confirm...',
      });
    } catch (error: any) {
      toast({
        title: 'Approval Failed',
        description: error?.message || 'Failed to approve token',
        variant: 'destructive',
      });
    } finally {
      setIsApproving(false);
      setTimeout(() => refetchAllowance(), 2000);
    }
  };

  const handleStake = async () => {
    if (!address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    if (selectedPool === null) {
      toast({
        title: 'Select Pool',
        description: 'Please select a staking pool first',
        variant: 'destructive',
      });
      return;
    }

    const pool = stakingPools[selectedPool];
    const amount = parseFloat(stakeAmount);

    if (isNaN(amount) || amount < pool.minStake) {
      toast({
        title: 'Invalid Amount',
        description: `Minimum stake is ${pool.minStake.toLocaleString()} BIT`,
        variant: 'destructive',
      });
      return;
    }

    try {
      const amountToStake = parseUnits(stakeAmount, 9); // BIT has 9 decimals
      
      // Check if approval is needed
      const currentAllowance = allowance as bigint || BigInt(0);
      if (currentAllowance < amountToStake) {
        toast({
          title: 'Approval Required',
          description: 'Please approve the token spend first',
          variant: 'destructive',
        });
        return;
      }

      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
        abi: CONTRACT_ABIS.BIT_STAKING,
        functionName: 'stake',
        args: [BigInt(selectedPool), amountToStake],
      } as any);

      toast({
        title: 'Staking Submitted',
        description: 'Please wait for the transaction to confirm...',
      });
    } catch (error: any) {
      toast({
        title: 'Staking Failed',
        description: error?.message || 'Failed to stake tokens',
        variant: 'destructive',
      });
    }
  };

  const handleUnstake = async (stakeId: number) => {
    if (!address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
        abi: CONTRACT_ABIS.BIT_STAKING,
        functionName: 'unstake',
        args: [BigInt(stakeId)],
      } as any);

      toast({
        title: 'Unstake Submitted',
        description: 'Please wait for the transaction to confirm...',
      });
    } catch (error: any) {
      toast({
        title: 'Unstake Failed',
        description: error?.message || 'Failed to unstake tokens',
        variant: 'destructive',
      });
    }
  };

  const totalStaked = totalUserStaked ? Number(formatUnits(totalUserStaked as bigint, 9)) : 0;
  const totalRewards = totalRewardsData ? Number(formatUnits(totalRewardsData as bigint, 9)) : 0;
  const balance = bitBalance ? Number(formatUnits(bitBalance as bigint, 9)) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Dashboard Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                <div className="flex items-center gap-2">
                  <img src={bitLogo} alt="BIT Token" className="w-10 h-10" />
                  <div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p className="text-sm text-muted-foreground">BIT Tokens</p>
                  </div>
                </div>
              </div>
              <Wallet className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Staked</p>
                <div className="flex items-center gap-2">
                  <img src={bitLogo} alt="BIT Token" className="w-10 h-10" />
                  <div>
                    <p className="text-3xl font-bold">{totalStaked.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">BIT Tokens</p>
                  </div>
                </div>
              </div>
              <Lock className="w-12 h-12 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rewards Earned</p>
                <div className="flex items-center gap-2">
                  <img src={bitLogo} alt="BIT Token" className="w-10 h-10" />
                  <div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalRewards.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">BIT Tokens</p>
                  </div>
                </div>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-50" />
            </div>
            <Button 
              disabled
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold opacity-50 cursor-not-allowed"
              size="sm"
            >
              <Gift className="w-4 h-4 mr-2" />
              Claim (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Positions</p>
                <p className="text-3xl font-bold">{userStakes ? (userStakes as any[]).filter((s: any) => s.isActive).length : 0}</p>
                <p className="text-sm text-muted-foreground">Staking Pools</p>
              </div>
              <Clock className="w-12 h-12 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Staking Positions */}
      {userStakes && (userStakes as any[]).length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Your Staking Positions</CardTitle>
            <CardDescription>Manage your active stakes and view rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(userStakes as any[]).map((stake: any, idx: number) => {
              const amount = Number(formatUnits(stake.amount, 9));
              const poolId = Number(stake.poolId);
              const pool = stakingPools[poolId];
              const startTime = Number(stake.startTime) * 1000;
              const endTime = Number(stake.endTime) * 1000;
              const daysRemaining = Math.max(0, Math.ceil((endTime - Date.now()) / (1000 * 60 * 60 * 24)));
              const isActive = stake.isActive;

              if (!isActive) return null;

              return (
                <Card key={idx} className={`bg-gradient-to-r ${pool?.color || 'from-primary/20 to-primary/5'} ${pool?.borderColor || 'border-primary/30'} border`}>
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Staked Amount</span>
                          <span className="font-bold text-lg">{amount.toLocaleString()} BIT</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">APY</span>
                          <Badge variant="default">{pool?.apy || 0}%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Lock Period</span>
                          <span className="font-semibold">{pool?.days || 0} days</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Start Date</span>
                          <span className="font-semibold">{new Date(startTime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">End Date</span>
                          <span className="font-semibold">{new Date(endTime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Days Remaining</span>
                          <Badge variant={daysRemaining > 0 ? "secondary" : "default"}>
                            {daysRemaining > 0 ? `${daysRemaining} days` : 'Matured'}
                          </Badge>
                        </div>

                        <Button
                          onClick={() => handleUnstake(idx)}
                          variant={daysRemaining > 0 ? "destructive" : "default"}
                          className="w-full mt-2"
                          size="sm"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          Unstake {daysRemaining > 0 ? '(Early)' : ''}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Fee Information */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Unstaking Fees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <p className="font-semibold mb-2">Standard Unstake Fee</p>
              <p className="text-3xl font-bold text-primary">{UNSTAKE_FEE}%</p>
              <p className="text-sm text-muted-foreground mt-1">Applied to all unstaking operations</p>
            </div>
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Early Unstake Penalty
              </p>
              <p className="text-3xl font-bold text-destructive">{EARLY_UNSTAKE_FEE}%</p>
              <p className="text-sm text-muted-foreground mt-1">Additional fee for unstaking before maturity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staking Pools */}
      <div className="grid md:grid-cols-3 gap-6">
        {stakingPools.map((pool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`relative cursor-pointer transition-all ${
                selectedPool === index
                  ? `bg-gradient-to-br ${pool.color} ${pool.borderColor} border-2`
                  : 'bg-card border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedPool(index)}
            >
              {pool.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <Lock className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl">{pool.days} Days Lock</CardTitle>
                <div className="space-y-1">
                  <p className="text-4xl font-bold text-primary">{pool.apy}%</p>
                  <p className="text-sm text-muted-foreground">APY</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min Stake:</span>
                  <span className="font-bold">{pool.minStake.toLocaleString()} BIT</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Staked:</span>
                  <span className="font-bold">{pool.totalStaked}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lock Period:</span>
                  <span className="font-bold">{pool.days} days</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Staking Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Stake Your BIT Tokens</CardTitle>
          <CardDescription>
            {selectedPool !== null
              ? `Selected: ${stakingPools[selectedPool].days} days pool with ${stakingPools[selectedPool].apy}% APY`
              : 'Select a pool above to start staking'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="stakeAmount" className="text-lg">
              Amount to Stake (BIT)
            </Label>
            <Input
              id="stakeAmount"
              type="number"
              placeholder="Enter amount"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="text-lg h-12"
              min="0"
              disabled={selectedPool === null}
            />
            {selectedPool !== null && (
              <p className="text-sm text-muted-foreground">
                Minimum: {stakingPools[selectedPool].minStake.toLocaleString()} BIT
              </p>
            )}
          </div>

          {selectedPool !== null && stakeAmount && parseFloat(stakeAmount) > 0 && (
            <div className="bg-secondary/50 p-6 rounded-lg border border-border">
              <h3 className="font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Staking Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staking Amount:</span>
                  <span className="font-bold">{parseFloat(stakeAmount).toLocaleString()} BIT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lock Period:</span>
                  <span className="font-bold">{stakingPools[selectedPool].days} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APY:</span>
                  <span className="font-bold text-primary">{stakingPools[selectedPool].apy}%</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Rewards:</span>
                    <span className="text-xl font-bold text-primary">
                      {calculateRewards(stakeAmount, stakingPools[selectedPool])} BIT
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground">Total at Maturity:</span>
                    <span className="text-lg font-bold">
                      {(
                        parseFloat(stakeAmount) +
                        parseFloat(calculateRewards(stakeAmount, stakingPools[selectedPool]))
                      ).toFixed(2)}{' '}
                      BIT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {stakeAmount && parseFloat(stakeAmount) > 0 && (
              <>
                {!allowance || (allowance as bigint) < parseUnits(stakeAmount, 9) ? (
                  <Button
                    onClick={handleApprove}
                    disabled={!address || isApproving || selectedPool === null}
                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
                  >
                    {isApproving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Approve BIT
                      </>
                    )}
                  </Button>
                ) : null}
              </>
            )}

            <Button
              onClick={handleStake}
              disabled={
                !address ||
                isStaking ||
                isConfirming ||
                selectedPool === null ||
                !stakeAmount ||
                parseFloat(stakeAmount) <= 0 ||
                !allowance ||
                (allowance as bigint) < parseUnits(stakeAmount || '0', 9)
              }
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
            >
              {isStaking || isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isConfirming ? 'Confirming...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  {!address ? 'Connect Wallet' : 'Stake BIT Tokens'}
                </>
              )}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Tokens will be locked for the selected period
            </p>
            <p>• Rewards are calculated daily and distributed at maturity</p>
            <p>• Standard unstake fee: {UNSTAKE_FEE}%</p>
            <p>• Early unstake penalty: {EARLY_UNSTAKE_FEE}% (total {UNSTAKE_FEE + EARLY_UNSTAKE_FEE}%)</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StakingTab;