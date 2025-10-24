import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, Gift, TrendingUp, Users, Store, Coins, Lock, Repeat, CalendarCheck, Crown, Zap, Shield, Code, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Ecosystem = () => {
  const coreComponents = [
    {
      icon: Coins,
      title: 'Buy BIT',
      description: 'Purchase BIT tokens using USDT-BEP20 or USDC-BEP20 at a fixed price of $0.00108 per BIT. Available on BSC, Polygon, Arbitrum, and Base networks. Minimum purchase of 100,000 BIT tokens to get started.',
    },
    {
      icon: Gift,
      title: 'Collect BIT',
      description: 'Earn BIT tokens as rewards through multiple activities: daily login bonuses, referral programs, completing tasks, participating in community events, and engaging with our ecosystem partners.',
    },
    {
      icon: Lock,
      title: 'Stake & Grow BIT',
      description: 'Lock your BIT tokens in our staking platform to earn passive rewards. Choose from multiple staking tiers with competitive APY rates. The longer you stake, the higher your rewards potential.',
    },
    {
      icon: Repeat,
      title: 'Swap BIT',
      description: 'Seamlessly swap your BIT tokens with other cryptocurrencies through our integrated DEX. Trade with minimal fees, instant execution, and full transparency on the blockchain.',
    },
    {
      icon: TrendingUp,
      title: 'Earn BIT',
      description: 'Generate BIT token rewards by staking, referring friends, shopping at partner merchants, participating in governance, and contributing to community growth. Multiple earning streams available.',
    },
    {
      icon: Crown,
      title: 'Membership Benefits',
      description: 'Unlock exclusive perks with tiered membership levels. Higher tiers offer premium features, enhanced reward multipliers, priority support, and early access to new opportunities.',
    },
  ];

  const tokenHolderBenefits = [
    'Earn BIT token rewards through staking activities',
    'Receive BIT rewards for platform participation and engagement',
    'Get BIT bonuses through governance participation',
    'Earn BIT incentives for early feature adoption',
    'Collect BIT rewards from referral programs',
    'Receive BIT appreciation as ecosystem grows',
    'Earn discounted transaction fees paid in BIT rewards',
    'Get priority BIT rewards from limited edition events',
  ];

  const merchantBenefits = [
    'Accept USDT/USDC payments across 4 blockchain networks',
    'Earn BIT token rewards for processing customer transactions',
    'Receive BIT bonuses for hitting transaction milestones',
    'Get instant settlement in USDT or USDC stablecoins',
    'Collect BIT rewards through merchant loyalty program',
    'Lower transaction fees with BIT reward incentives',
    'Earn BIT tokens for referring other merchants',
    'Access real-time analytics dashboard and BIT earnings tracking',
  ];

  const customerBenefits = [
    'Pay with USDT or USDC at participating merchants',
    'Earn BIT token rewards as cashback on every purchase',
    'Collect BIT bonuses for shopping frequency milestones',
    'Get instant confirmation with blockchain verification',
    'Receive BIT loyalty rewards and exclusive discounts',
    'Earn BIT tokens through referral program participation',
    'Pay across 4 networks: BSC, Polygon, Arbitrum, and Base',
    'Build BIT reward history for premium membership tiers',
  ];

  const communityBenefits = [
    'Earn BIT rewards for community participation and engagement',
    'Collect BIT tokens through social-to-earn opportunities',
    'Receive BIT bonuses from regular airdrop events',
    'Get BIT rewards for educational content creation',
    'Multi-chain support: BSC, Polygon, Arbitrum, Base networks',
    'Earn BIT through community-driven governance participation',
    'Access BIT-rewarded educational resources and webinars',
    'Receive BIT incentives for active forum and support contributions',
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
          <h2 className="text-4xl font-bold text-center mb-4">BIT Token Utility</h2>
          <p className="text-center text-muted-foreground mb-12">
            BIT tokens serve as rewards within our ecosystem - not as payment or security
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
          <h2 className="text-4xl font-bold text-center mb-4">BIT Rewards Ecosystem</h2>
          <p className="text-center text-muted-foreground mb-12">
            Earn BIT tokens as rewards - Payments processed via USDT/USDC on 4 networks
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Wallet className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For Token Holders</h3>
                </div>
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
                <div className="flex items-center gap-3 mb-6">
                  <Gift className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For the Community</h3>
                </div>
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

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For Customers</h3>
                </div>
                <ul className="space-y-3">
                  {customerBenefits.map((benefit, index) => (
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
                <div className="flex items-center gap-3 mb-6">
                  <Store className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For Merchants</h3>
                </div>
                <ul className="space-y-3">
                  {merchantBenefits.map((benefit, index) => (
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
