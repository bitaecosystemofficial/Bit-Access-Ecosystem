import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, Gift, TrendingUp, Users, Store, Coins, Lock, Repeat, CalendarCheck, Crown, Zap, Shield, Code, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Ecosystem = () => {
  const coreComponents = [
    {
      icon: Coins,
      title: 'BIT Token',
      description: 'The native utility token powering all ecosystem transactions, rewards, and governance activities. Stake BIT tokens to earn passive income and participate in platform decisions.',
    },
    {
      icon: Lock,
      title: 'Staking Platform',
      description: 'Multiple staking tiers offering competitive APY rates. Lock your tokens to earn rewards while supporting network security and stability.',
    },
    {
      icon: Repeat,
      title: 'DEX Integration',
      description: 'Seamlessly swap BIT tokens with other cryptocurrencies through our integrated decentralized exchange functionality with minimal fees.',
    },
    {
      icon: CalendarCheck,
      title: 'Daily Rewards Claim',
      description: 'Claim daily rewards and bonuses. Participate in social-to-earn activities and engage in community-driven initiatives to maximize your earnings.',
    },
    {
      icon: Crown,
      title: 'Membership System',
      description: 'Unlock exclusive benefits with tiered membership levels offering premium features, enhanced rewards, and priority access to new opportunities.',
    },
    {
      icon: Zap,
      title: 'Airdrop Campaign',
      description: 'Participate in regular airdrops and token distribution events. Complete tasks to earn BIT tokens and build your portfolio.',
    },
  ];

  const tokenHolderBenefits = [
    'Earn passive income through staking rewards',
    'Access to exclusive membership benefits',
    'Participate in platform governance',
    'Early access to new features and opportunities',
    'Referral rewards and community incentives',
  ];

  const communityBenefits = [
    'Transparent and secure blockchain infrastructure',
    'Low transaction fees on BSC network',
    'Regular airdrops and promotional events',
    'Social-to-earn opportunities',
    'Growing ecosystem of partners and integrations',
  ];

  const techStack = [
    {
      icon: Shield,
      title: 'Blockchain',
      description: 'Binance Smart Chain (BEP-20)',
    },
    {
      icon: Code,
      title: 'Smart Contracts',
      description: 'Solidity, Audited & Verified',
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Multi-sig wallets, Regular audits',
    },
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

        {/* Core Components */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Core Components</h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need for a complete Web3 experience
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <component.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{component.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{component.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ecosystem Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Ecosystem Benefits</h2>
          <p className="text-center text-muted-foreground mb-12">
            Value for every participant in our ecosystem
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">For Token Holders</h3>
                <ul className="space-y-3">
                  {tokenHolderBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">For the Community</h3>
                <ul className="space-y-3">
                  {communityBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Technology Stack</h2>
          <p className="text-center text-muted-foreground mb-12">
            Built on industry-leading blockchain technology
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-primary/30 hover:border-primary transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <tech.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ecosystem;
