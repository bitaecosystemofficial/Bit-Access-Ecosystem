import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  const { open } = useWeb3Modal();

  const stats = [
    { label: 'Total Users', value: '50K+' },
    { label: 'Active Merchants', value: '1,200+' },
    { label: 'BIT in Circulation', value: '10M' },
    { label: 'Avg Transaction Speed', value: '<2s' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Pay with Stablecoins',
      description: 'Merchants accept USDT/USDC payments for instant, secure transactions',
    },
    {
      icon: Shield,
      title: 'Earn BIT Rewards',
      description: 'Get BIT tokens as rewards for every purchase at participating merchants',
    },
    {
      icon: TrendingUp,
      title: 'Stake & Multiply',
      description: 'Lock your BIT rewards to earn up to 25% APY with flexible staking pools',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 z-0 animate-gradient"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-gold">
              Earn BIT Rewards with Every Transaction
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Merchants Accept USDT/USDC • Customers Earn BIT Rewards
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => open()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-lg px-8"
              >
                Connect Wallet
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 font-mono text-lg px-8"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-md border-border">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Bit Access?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of payments with instant Web3 transactions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
