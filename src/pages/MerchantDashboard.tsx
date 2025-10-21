import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package,
  ArrowLeft,
  BarChart3,
  Settings,
  Gift,
  Wallet
} from 'lucide-react';
import { useBITBalance } from '@/contexts/BITBalanceContext';

const MerchantDashboard = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { balance, formatBalance } = useBITBalance();
  const [subscriptionTier, setSubscriptionTier] = useState<'Starter' | 'Professional' | 'Enterprise'>('Professional');

  useEffect(() => {
    if (!isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  const stats = {
    totalSales: '15,234 BIT',
    totalCustomers: 234,
    pendingOrders: 12,
    monthlyRevenue: '45,678 BIT',
    usdtRewards: subscriptionTier === 'Starter' ? '152.34 USDT' : subscriptionTier === 'Professional' ? '304.68 USDT' : '456.78 USDT',
    bnbRewards: subscriptionTier === 'Starter' ? '0.25 BNB' : subscriptionTier === 'Professional' ? '0.50 BNB' : '0.75 BNB',
    btcbRewards: subscriptionTier === 'Starter' ? '0.0025 BTCB' : subscriptionTier === 'Professional' ? '0.0050 BTCB' : '0.0075 BTCB',
    bitRewards: subscriptionTier === 'Starter' ? '305 BIT' : subscriptionTier === 'Professional' ? '2,284 BIT' : '4,568 BIT',
  };

  const recentTransactions = [
    { id: 'TX001', customer: 'Alice Johnson', amount: '250 BIT', date: '2025-01-20', status: 'Completed' },
    { id: 'TX002', customer: 'Bob Smith', amount: '180 BIT', date: '2025-01-19', status: 'Completed' },
    { id: 'TX003', customer: 'Carol White', amount: '420 BIT', date: '2025-01-19', status: 'Pending' },
    { id: 'TX004', customer: 'David Brown', amount: '150 BIT', date: '2025-01-18', status: 'Completed' },
  ];

  const tierBenefits = {
    Starter: { usdt: '1%', bnb: '0.5%', btcb: '0.25%', bit: '2%' },
    Professional: { usdt: '2%', bnb: '1%', btcb: '0.5%', bit: '5%' },
    Enterprise: { usdt: '3%', bnb: '1.5%', btcb: '1%', bit: '10%' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-20">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
            {subscriptionTier} Plan
          </Badge>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30">
            <CardHeader>
              <CardTitle className="text-4xl flex items-center gap-3">
                <Store className="w-10 h-10 text-primary" />
                Merchant Dashboard
              </CardTitle>
              <CardDescription className="text-lg">
                Manage your store, track sales, and monitor rewards
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalSales}</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customers</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalCustomers}</p>
                  </div>
                  <Users className="w-10 h-10 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Orders</p>
                    <p className="text-2xl font-bold text-primary">{stats.pendingOrders}</p>
                  </div>
                  <Package className="w-10 h-10 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-primary">{stats.monthlyRevenue}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rewards Section */}
          <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-green-500/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Gift className="w-7 h-7 text-green-500" />
                Your Rewards
              </CardTitle>
              <CardDescription>
                Earning {tierBenefits[subscriptionTier].usdt} USDT, {tierBenefits[subscriptionTier].bnb} BNB, {tierBenefits[subscriptionTier].btcb} BTCB, and {tierBenefits[subscriptionTier].bit} BIT on all transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-card/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">USDT Rewards</p>
                  <p className="text-xl font-bold text-green-600">{stats.usdtRewards}</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">BNB Rewards</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.bnbRewards}</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">BTCB Rewards</p>
                  <p className="text-xl font-bold text-orange-600">{stats.btcbRewards}</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">BIT Rewards</p>
                  <p className="text-xl font-bold text-primary">{stats.bitRewards}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest customer purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                        <div>
                          <p className="font-semibold">{tx.customer}</p>
                          <p className="text-sm text-muted-foreground">{tx.id} • {tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{tx.amount}</p>
                          <Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'}>
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    Sales Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-12 text-center">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Advanced analytics coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-6 h-6 text-primary" />
                    Store Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="font-semibold mb-2">Subscription Tier</p>
                    <div className="flex gap-2">
                      <Button
                        variant={subscriptionTier === 'Starter' ? 'default' : 'outline'}
                        onClick={() => setSubscriptionTier('Starter')}
                      >
                        Starter
                      </Button>
                      <Button
                        variant={subscriptionTier === 'Professional' ? 'default' : 'outline'}
                        onClick={() => setSubscriptionTier('Professional')}
                      >
                        Professional
                      </Button>
                      <Button
                        variant={subscriptionTier === 'Enterprise' ? 'default' : 'outline'}
                        onClick={() => setSubscriptionTier('Enterprise')}
                      >
                        Enterprise
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="font-semibold mb-2">Your BIT Balance</p>
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold text-primary">{formatBalance(balance)} BIT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
