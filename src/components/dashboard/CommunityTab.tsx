import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, MessageSquare, Trophy, Gift } from 'lucide-react';

const CommunityTab = () => {
  const communityStats = [
    { icon: Users, label: 'Total Members', value: '12,450', color: 'text-primary' },
    { icon: MessageSquare, label: 'Active Discussions', value: '234', color: 'text-accent' },
    { icon: Trophy, label: 'Top Contributors', value: '89', color: 'text-yellow-400' },
    { icon: Gift, label: 'Rewards Distributed', value: '45.2K BIT', color: 'text-green-400' },
  ];

  const recentActivity = [
    { user: '0x742d...3f4a', action: 'Earned 150 BIT from merchant rewards', time: '2 hours ago' },
    { user: '0x9a1b...8c2d', action: 'Joined staking pool (365 days)', time: '5 hours ago' },
    { user: '0x3e5f...1a9b', action: 'Referred 3 new merchants', time: '8 hours ago' },
    { user: '0xc7d2...4b8e', action: 'Completed community challenge', time: '12 hours ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Community Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Community Activity</CardTitle>
          <CardDescription>Recent actions from the BIT Access community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
              >
                <Users className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-mono text-sm text-primary">{activity.user}</p>
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Benefits */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle>Community Rewards Program</CardTitle>
          <CardDescription>Earn extra BIT by participating in the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Gift className="w-5 h-5 text-primary" />
              <p>Refer merchants and earn 5% of their first-year rewards</p>
            </div>
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-primary" />
              <p>Complete weekly challenges for bonus BIT tokens</p>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-primary" />
              <p>Active contributors receive monthly airdrops</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityTab;
