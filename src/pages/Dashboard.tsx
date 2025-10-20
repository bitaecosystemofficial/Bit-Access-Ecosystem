import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyBitTab from '@/components/dashboard/BuyBitTab';
import CommunityTab from '@/components/dashboard/CommunityTab';
import MerchantsTab from '@/components/dashboard/MerchantsTab';
import StakingTab from '@/components/dashboard/StakingTab';

const Dashboard = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-shadow-gold text-center">Dashboard</h1>
        
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card border border-border">
            <TabsTrigger value="buy" className="font-mono">Buy BIT Token</TabsTrigger>
            <TabsTrigger value="community" className="font-mono">Community</TabsTrigger>
            <TabsTrigger value="merchants" className="font-mono">Merchants Subscription</TabsTrigger>
            <TabsTrigger value="staking" className="font-mono">Staking</TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            <BuyBitTab />
          </TabsContent>

          <TabsContent value="community">
            <CommunityTab />
          </TabsContent>

          <TabsContent value="merchants">
            <MerchantsTab />
          </TabsContent>

          <TabsContent value="staking">
            <StakingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
