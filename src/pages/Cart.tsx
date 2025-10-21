import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useBITBalance } from '@/contexts/BITBalanceContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { items, removeFromCart, clearCart, itemCount } = useCart();
  const { balance, deductBalance, formatBalance } = useBITBalance();
  const { toast } = useToast();

  useEffect(() => {
    if (!isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  const totalBIT = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(' BIT', ''));
    return sum + price;
  }, 0);

  const totalUSD = items.reduce((sum, item) => {
    const price = parseFloat(item.usdPrice.replace('$', ''));
    return sum + price;
  }, 0);

  const handleCheckout = () => {
    const canPurchase = deductBalance(totalBIT);
    
    if (canPurchase) {
      toast({
        title: 'Checkout Successful! 🎉',
        description: `Order processed! ${totalBIT.toFixed(2)} BIT deducted. New balance: ${formatBalance(balance - totalBIT)} BIT`,
      });
      clearCart();
    } else {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${totalBIT.toFixed(2)} BIT but only have ${formatBalance(balance)} BIT. Please buy more BIT tokens.`,
        variant: 'destructive',
      });
    }
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: 'Removed from Cart',
      description: `${name} has been removed from your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-20">
      <div className="container mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                    Shopping Cart
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Your Balance</p>
                    <p className="text-2xl font-bold text-primary">{formatBalance(balance)} BIT</p>
                  </div>
                  {itemCount > 0 && (
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cart
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {items.length === 0 ? (
            <Card className="bg-card/50 border-border">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Add items from the NFT Marketplace or Merchandise store to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg">{item.name}</h3>
                              <Badge variant="outline" className="mt-1">
                                {item.type === 'nft' ? (
                                  <Package className="w-3 h-3 mr-1" />
                                ) : (
                                  <ShoppingBag className="w-3 h-3 mr-1" />
                                )}
                                {item.type === 'nft' ? 'NFT' : 'Merchandise'}
                              </Badge>
                            </div>
                            <Button
                              onClick={() => handleRemove(item.id, item.name)}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {item.rarity && (
                            <p className="text-sm text-muted-foreground mb-1">
                              Rarity: {item.rarity}
                            </p>
                          )}

                          {item.size && (
                            <p className="text-sm text-muted-foreground mb-1">
                              Size: {item.size}
                            </p>
                          )}

                          {item.color && (
                            <p className="text-sm text-muted-foreground mb-1">
                              Color: {item.color}
                            </p>
                          )}

                          <div className="flex items-baseline gap-2 mt-3">
                            <span className="text-xl font-bold text-primary">{item.price}</span>
                            <span className="text-sm text-muted-foreground">({item.usdPrice})</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-card border-border sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Items ({itemCount})</span>
                        <span className="font-medium">{totalBIT.toFixed(2)} BIT</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">USD Equivalent</span>
                        <span className="font-medium">${totalUSD.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <div className="text-right">
                        <div className="text-primary">{totalBIT.toFixed(2)} BIT</div>
                        <div className="text-sm text-muted-foreground">${totalUSD.toFixed(2)}</div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleCheckout} 
                      className="w-full" 
                      size="lg"
                      disabled={balance < totalBIT}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {balance < totalBIT ? 'Insufficient Balance' : 'Proceed to Checkout'}
                    </Button>

                    {balance < totalBIT && (
                      <div className="text-xs text-destructive text-center">
                        Need {(totalBIT - balance).toFixed(2)} more BIT
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
