import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const BuyBitTab = () => {
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('bsc');
  const { toast } = useToast();
  const pricePerBit = 0.00125;

  const networks = [
    { id: 'bsc', name: 'BNB Smart Chain', active: true, color: 'text-yellow-400' },
    { id: 'polygon', name: 'Polygon', active: false, color: 'text-purple-400' },
    { id: 'base', name: 'Base', active: false, color: 'text-blue-400' },
    { id: 'arbitrum', name: 'Arbitrum', active: false, color: 'text-cyan-400' },
  ];

  const calculateBit = (usdAmount: string) => {
    const usd = parseFloat(usdAmount);
    if (isNaN(usd) || usd <= 0) return '0';
    return (usd / pricePerBit).toFixed(2);
  };

  const handleBuy = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    if (selectedNetwork !== 'bsc') {
      toast({
        title: 'Coming Soon',
        description: `${networks.find(n => n.id === selectedNetwork)?.name} will be available soon`,
      });
      return;
    }

    toast({
      title: 'Purchase Initiated',
      description: `Buying ${calculateBit(amount)} BIT tokens`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-3xl">Buy BIT Token</CardTitle>
          <CardDescription className="text-lg">
            Purchase BIT rewards tokens with USDT or USDC at ${pricePerBit} per BIT
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Network Selection */}
          <div>
            <Label className="text-lg mb-3 block">Select Network</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {networks.map((network) => (
                <Button
                  key={network.id}
                  variant={selectedNetwork === network.id ? 'default' : 'outline'}
                  onClick={() => setSelectedNetwork(network.id)}
                  disabled={!network.active}
                  className="relative h-20 flex flex-col items-center justify-center"
                >
                  <span className={network.color}>{network.name}</span>
                  {network.id === 'bsc' && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      Active
                    </Badge>
                  )}
                  {!network.active && (
                    <span className="text-xs text-muted-foreground mt-1">Coming Soon</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-lg">
              Amount (USDT/USDC)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg h-12"
              min="0"
              step="0.01"
            />
          </div>

          {/* Calculation Display */}
          <div className="bg-secondary/50 p-6 rounded-lg border border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">You Pay:</span>
              <span className="text-xl font-bold">{amount || '0'} USDT/USDC</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">You Receive:</span>
              <span className="text-2xl font-bold text-primary">{calculateBit(amount)} BIT</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per BIT:</span>
                <span>${pricePerBit} USDT/USDC</span>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <Button
            onClick={handleBuy}
            className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
            disabled={selectedNetwork !== 'bsc'}
          >
            {selectedNetwork === 'bsc' ? 'Buy BIT Token' : 'Network Coming Soon'}
          </Button>

          {/* Info */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• BIT tokens are reward tokens earned when merchants accept USDT/USDC payments</p>
            <p>• You can also purchase BIT directly to participate in staking and community rewards</p>
            <p>• Transactions are processed on-chain with full transparency</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BuyBitTab;
