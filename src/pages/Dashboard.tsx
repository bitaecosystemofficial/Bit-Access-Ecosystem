import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ShoppingBag, TrendingUp, Users, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import BuyBitTab from '@/components/dashboard/BuyBitTab';
import StakingTab from '@/components/dashboard/StakingTab';
import CommunityTab from '@/components/dashboard/CommunityTab';
import PWAInstallPrompt from '@/components/dashboard/PWAInstallPrompt';

const Dashboard = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  const menuItems = [
    { value: 'buy', label: 'Buy BIT Token', icon: ShoppingBag },
    { value: 'staking', label: 'Staking', icon: TrendingUp },
    { value: 'community', label: 'Community', icon: Users },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <PWAInstallPrompt />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm border border-border/50 p-1 h-auto">
            {menuItems.map((item) => (
              <TabsTrigger 
                key={item.value} 
                value={item.value} 
                className="font-semibold py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="buy" className="mt-0">
            <BuyBitTab />
          </TabsContent>

          <TabsContent value="staking" className="mt-0">
            <StakingTab />
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <CommunityTab />
          </TabsContent>
        </Tabs>

        {/* Mobile Floating Bottom Navigation */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-2xl z-50"
        >
          <div className="grid grid-cols-4 gap-1 p-2">
            <Button
              variant={activeTab === 'buy' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('buy')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'buy' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] font-medium">Buy BIT</span>
            </Button>
            
            <Button
              variant={activeTab === 'staking' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('staking')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'staking' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-[10px] font-medium">Staking</span>
            </Button>
            
            <Button
              variant={activeTab === 'community' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('community')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'community' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-medium">Community</span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => disconnect()}
              className="flex flex-col items-center justify-center h-16 gap-1 hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-medium">Disconnect</span>
            </Button>
          </div>
        </motion.div>

        {/* Add padding at bottom on mobile to account for floating nav */}
        <div className="md:hidden h-20"></div>
      </div>
    </div>
  );
};

export default Dashboard;
