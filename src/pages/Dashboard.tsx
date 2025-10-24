import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ShoppingBag, TrendingUp, Menu } from 'lucide-react';
import BuyBitTab from '@/components/dashboard/BuyBitTab';
import StakingTab from '@/components/dashboard/StakingTab';

const Dashboard = () => {
  const { isConnected } = useAccount();
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
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-2 mb-8 bg-card/50 backdrop-blur-sm border border-border/50 p-1 h-auto">
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

          {/* Mobile Dropdown Menu */}
          <div className="md:hidden mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full h-14 justify-between bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center">
                    {menuItems.find(item => item.value === activeTab)?.icon && (
                      <>
                        {(() => {
                          const Icon = menuItems.find(item => item.value === activeTab)!.icon;
                          return <Icon className="w-5 h-5 mr-2" />;
                        })()}
                      </>
                    )}
                    <span className="font-semibold">{menuItems.find(item => item.value === activeTab)?.label}</span>
                  </div>
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[calc(100vw-2rem)] bg-card/95 backdrop-blur-sm border-border/50">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {menuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.value}
                      onClick={() => setActiveTab(item.value)}
                      className={`flex flex-col items-center justify-center p-4 cursor-pointer rounded-lg ${
                        activeTab === item.value ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <item.icon className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium text-center">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="buy" className="mt-0">
            <BuyBitTab />
          </TabsContent>

          <TabsContent value="staking" className="mt-0">
            <StakingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
