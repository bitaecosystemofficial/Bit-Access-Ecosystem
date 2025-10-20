import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, Gift, TrendingUp, Users, Store } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Ecosystem = () => {
  const userJourney = [
    {
      icon: Wallet,
      step: '01',
      title: 'Connect Wallet',
      description: 'Link your Web3 wallet in seconds using our secure integration',
    },
    {
      icon: Gift,
      step: '02',
      title: 'Earn BIT Rewards',
      description: 'Receive BIT tokens when merchants accept your USDT/USDC payments',
    },
    {
      icon: ShoppingBag,
      step: '03',
      title: 'Stake & Grow',
      description: 'Lock your BIT rewards in staking pools to earn up to 25% APY',
    },
  ];

  const merchantBenefits = [
    {
      icon: TrendingUp,
      title: 'Instant USDT/USDC Settlement',
      description: 'Receive stablecoin payments instantly without traditional banking delays',
    },
    {
      icon: Users,
      title: 'Reward Your Customers',
      description: 'Customers earn BIT rewards, creating loyalty and repeat purchases',
    },
    {
      icon: Store,
      title: 'Lower Fees',
      description: 'Reduced transaction costs compared to traditional payment processors',
    },
  ];

  const tokenomics = [
    { label: 'Total Supply', value: '100M BIT' },
    { label: 'Circulating Supply', value: '10M BIT' },
    { label: 'Staking Rewards', value: '15% APY' },
    { label: 'Burn Mechanism', value: 'Active' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Ecosystem</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete Web3 payment ecosystem connecting users, merchants, and opportunities
          </p>
        </motion.div>

        {/* User Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">User Journey</h2>
          <p className="text-center text-muted-foreground mb-12">
            Three simple steps to join the Web3 payment revolution
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {userJourney.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">{item.step}</div>
                  <CardContent className="p-8 relative z-10">
                    <item.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Merchant Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Merchant Benefits</h2>
          <p className="text-center text-muted-foreground mb-12">
            Why merchants choose Bit Access for Web3 payments
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {merchantBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border h-full">
                  <CardContent className="p-8">
                    <benefit.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Token Economics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Token Economics</h2>
          <p className="text-center text-muted-foreground mb-12">
            Built for sustainability and long-term value creation
          </p>

          <Card className="bg-card border-primary/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {tokenomics.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-secondary/50 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-center">Deflationary Mechanism</h3>
                <p className="text-muted-foreground text-center">
                  A portion of every transaction is burned, creating scarcity and supporting long-term token value.
                  Staking rewards incentivize holding while reducing circulating supply.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ecosystem Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">How It All Connects</h2>
          <Card className="bg-gradient-to-br from-card to-secondary border-border">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customers</h3>
                  <p className="text-muted-foreground text-sm">Pay USDT/USDC, earn BIT rewards</p>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="w-full border-t-2 border-dashed border-primary"></div>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Store className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Merchants</h3>
                  <p className="text-muted-foreground text-sm">Accept USDT/USDC, reward customers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Ecosystem;
