import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, Check, Zap, TrendingUp, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBITBalance } from '@/contexts/BITBalanceContext';

const MerchantsTab = () => {
  const { toast } = useToast();
  const { balance, deductBalance, formatBalance } = useBITBalance();
  const [subscribedTier, setSubscribedTier] = useState<string | null>(null);
  
  const subscriptionTiers = [
    {
      name: 'Starter',
      bitStake: 100000,
      bitStakeDisplay: '100,000 BIT',
      features: [
        'Accept USDT/USDC payments',
        'Basic analytics dashboard',
        'Web3 Education Access',
        'Technical Training Basics',
        '1% USDT Rewards',
        '0.5% BNB Rewards',
        '0.25% BTCB Rewards',
        '2% BIT ACCESS Rewards',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      bitStake: 400000,
      bitStakeDisplay: '400,000 BIT',
      features: [
        'All Starter features',
        'Unlimited transactions',
        'Advanced Web3 Education',
        'Premium Technical Training',
        '2% USDT Rewards',
        '1% BNB Rewards',
        '0.5% BTCB Rewards',
        '5% BIT ACCESS Rewards',
        'Priority support',
        'Custom branding options',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      bitStake: 1000000,
      bitStakeDisplay: '1,000,000 BIT',
      features: [
        'All Professional features',
        'VIP Web3 Education Programs',
        'Exclusive Technical Workshops',
        '3% USDT Rewards',
        '1.5% BNB Rewards',
        '1% BTCB Rewards',
        '10% BIT ACCESS Rewards',
        'Multi-location support',
        'API access',
        'Dedicated account manager',
        'White-label solutions',
      ],
      popular: false,
    },
  ];

  const handleSubscribe = (tier: typeof subscriptionTiers[0]) => {
    const canSubscribe = deductBalance(tier.bitStake);
    
    if (canSubscribe) {
      setSubscribedTier(tier.name);
      toast({
        title: 'Subscription Successful! 🎉',
        description: `Subscribed to ${tier.name} plan. ${tier.bitStakeDisplay} BIT staked.`,
      });
    } else {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${tier.bitStakeDisplay} but only have ${formatBalance(balance)} BIT`,
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Balance Display */}
      <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your BIT Balance</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">{formatBalance(balance)}</p>
              <p className="text-sm text-muted-foreground">BIT Tokens</p>
            </div>
            <Wallet className="w-16 h-16 text-green-500 opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Merchant Subscription Plans</CardTitle>
          <CardDescription className="text-base md:text-lg">
            Stake BIT tokens to unlock merchant features and earn rewards in multiple cryptocurrencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative h-full ${
                    tier.popular
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-border'
                  }`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <Store className="w-10 h-10 text-primary mb-2" />
                    <CardTitle className="text-xl md:text-2xl">{tier.name}</CardTitle>
                    <div className="space-y-1">
                      <p className="text-2xl md:text-3xl font-bold text-primary">{tier.bitStakeDisplay}</p>
                      <p className="text-sm text-muted-foreground">
                        Stake Requirement
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => handleSubscribe(tier)}
                      disabled={balance < tier.bitStake || subscribedTier === tier.name}
                      className={`w-full ${
                        tier.popular
                          ? 'bg-primary hover:bg-primary/90'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {subscribedTier === tier.name ? 'Subscribed ✓' : 'Subscribe Now'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <Zap className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-bold mb-2">Instant Settlement</h3>
            <p className="text-muted-foreground">
              Receive USDT/USDC payments instantly with no delays or chargebacks
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <TrendingUp className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-bold mb-2">Customer Loyalty</h3>
            <p className="text-muted-foreground">
              Reward customers with BIT tokens to encourage repeat purchases
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <Store className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-bold mb-2">Lower Fees</h3>
            <p className="text-muted-foreground">
              Save on transaction fees compared to traditional payment processors
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default MerchantsTab;
