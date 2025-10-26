import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, PieChart, Lock, Rocket, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Tokenomics = () => {
  const tokenomicsData = [
    {
      icon: <Coins className="w-8 h-8 text-primary" />,
      title: "Total Supply",
      value: "1,000,000,000 BIT",
      description: "Fixed maximum supply"
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Locked Liquidity",
      value: "30%",
      description: "Secured for 5 years"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community",
      value: "40%",
      description: "Rewards & Airdrops"
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Development",
      value: "20%",
      description: "Platform growth"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Marketing",
      value: "10%",
      description: "Ecosystem expansion"
    }
  ];

  const allocation = [
    { category: "Community Rewards", percentage: 40, color: "bg-primary" },
    { category: "Locked Liquidity", percentage: 30, color: "bg-accent" },
    { category: "Development", percentage: 20, color: "bg-secondary" },
    { category: "Marketing", percentage: 10, color: "bg-muted" }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PieChart className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tokenomics
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the BIT Token distribution and economic model
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tokenomicsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{item.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Token Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Token Allocation</CardTitle>
              <CardDescription>Distribution breakdown of BIT tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allocation.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Utility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Token Utility</CardTitle>
              <CardDescription>How BIT powers the ecosystem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Governance</h3>
                  <p className="text-muted-foreground">
                    Vote on protocol upgrades and community proposals
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Staking Rewards</h3>
                  <p className="text-muted-foreground">
                    Earn passive income by staking your BIT tokens
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Transaction Fees</h3>
                  <p className="text-muted-foreground">
                    Reduced fees when paying with BIT tokens
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Ecosystem Access</h3>
                  <p className="text-muted-foreground">
                    Unlock premium features and services
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Tokenomics;
