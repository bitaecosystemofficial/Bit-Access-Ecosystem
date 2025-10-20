import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BuyBitTab = () => {
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('BSC');
  const { toast } = useToast();

  // Countdown timer: 120 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 120,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 120);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pricePerBit = 0.01; // $0.01 per BIT
  const minimumPurchase = 100000; // Minimum 100,000 BIT

  const networks = [
    { name: 'BSC', active: true, color: 'from-yellow-500/20 to-yellow-500/5' },
    { name: 'Polygon', active: false, color: 'from-purple-500/20 to-purple-500/5' },
    { name: 'Arbitrum', active: false, color: 'from-blue-500/20 to-blue-500/5' },
    { name: 'Base', active: false, color: 'from-blue-400/20 to-blue-400/5' },
  ];

  const calculateBit = (usdAmount: string): string => {
    const amt = parseFloat(usdAmount);
    if (isNaN(amt) || amt <= 0) return '0';
    return (amt / pricePerBit).toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const handleBuy = () => {
    const bitAmount = parseFloat(calculateBit(amount).replace(/,/g, ''));
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    if (bitAmount < minimumPurchase) {
      toast({
        title: 'Minimum Purchase Required',
        description: `Minimum purchase is ${minimumPurchase.toLocaleString()} BIT tokens ($${(minimumPurchase * pricePerBit).toLocaleString()})`,
        variant: 'destructive',
      });
      return;
    }

    if (selectedNetwork === 'BSC') {
      toast({
        title: 'Purchase Initiated',
        description: `Purchasing ${calculateBit(amount)} BIT tokens on ${selectedNetwork}`,
      });
    } else {
      toast({
        title: 'Network Coming Soon',
        description: `${selectedNetwork} network will be available soon`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Countdown Timer */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl md:text-3xl font-bold">Token Sale Ends In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-card border-2 border-primary/30 rounded-lg p-3 md:p-6 w-full shadow-lg">
                  <div className="text-2xl md:text-5xl font-bold text-primary text-center tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </div>
                </div>
                <p className="text-xs md:text-sm font-semibold text-muted-foreground mt-2 uppercase tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl flex items-center">
            <ShoppingBag className="w-7 h-7 mr-3 text-primary" />
            Purchase BIT Tokens
          </CardTitle>
          <CardDescription className="text-base">
            Enter the amount you want to invest in USD
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Network Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Network</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {networks.map((network) => (
                <Button
                  key={network.name}
                  variant={selectedNetwork === network.name ? 'default' : 'outline'}
                  onClick={() => setSelectedNetwork(network.name)}
                  disabled={!network.active}
                  className={`h-12 font-semibold transition-all ${
                    selectedNetwork === network.name
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-card/50 hover:bg-secondary/50'
                  } ${!network.active && 'opacity-50 cursor-not-allowed'}`}
                >
                  {network.name}
                  {network.active && <Badge className="ml-2 bg-green-500 text-white text-xs">Active</Badge>}
                </Button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-base font-semibold">
              Investment Amount (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl h-14 pl-8 font-semibold bg-background border-2 focus:border-primary"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-sm text-muted-foreground flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Minimum purchase: {minimumPurchase.toLocaleString()} BIT (${(minimumPurchase * pricePerBit).toLocaleString()})
            </p>
          </div>

          {/* Purchase Summary */}
          {amount && parseFloat(amount) > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-secondary/30 border-2 border-primary/20 p-6 rounded-xl space-y-3"
            >
              <h3 className="font-bold text-lg mb-4">Purchase Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">You Pay:</span>
                  <span className="text-xl font-bold">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Price per BIT:</span>
                  <span className="font-semibold">${pricePerBit}</span>
                </div>
                <div className="border-t-2 border-border pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">You Receive:</span>
                    <span className="text-2xl font-bold text-primary">{calculateBit(amount)} BIT</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-semibold">{selectedNetwork}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Buy Button */}
          <Button
            onClick={handleBuy}
            disabled={selectedNetwork !== 'BSC'}
            className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            {selectedNetwork !== 'BSC' ? 'Network Coming Soon' : 'Buy BIT Tokens'}
          </Button>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              <strong className="text-primary">Purchase Mechanics:</strong> Enter your desired investment amount in USD. 
              You will receive BIT tokens at a fixed rate of ${pricePerBit} per token. 
              Minimum purchase requirement is {minimumPurchase.toLocaleString()} BIT tokens. 
              Tokens will be transferred to your connected wallet address on the selected network.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BuyBitTab;
