import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Lock, TrendingUp, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StakingTab = () => {
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const { toast } = useToast();

  const stakingPools = [
    {
      days: 180,
      apy: 12,
      minStake: 1000,
      totalStaked: '1.2M BIT',
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
    },
    {
      days: 240,
      apy: 18,
      minStake: 5000,
      totalStaked: '3.5M BIT',
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/30',
      popular: true,
    },
    {
      days: 365,
      apy: 25,
      minStake: 10000,
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

  const handleStake = () => {
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
        description: `Minimum stake is ${pool.minStake} BIT`,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Staking Initiated',
      description: `Staking ${amount} BIT for ${pool.days} days`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
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

          <Button
            onClick={handleStake}
            disabled={selectedPool === null}
            className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
          >
            <Lock className="w-5 h-5 mr-2" />
            Stake BIT Tokens
          </Button>

          <div className="text-sm text-muted-foreground space-y-2">
            <p className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Tokens will be locked for the selected period
            </p>
            <p>• Rewards are calculated daily and distributed at maturity</p>
            <p>• Early withdrawal is not available - choose your lock period carefully</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StakingTab;
