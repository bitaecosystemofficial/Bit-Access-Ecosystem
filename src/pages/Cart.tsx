import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useBITBalance } from '@/contexts/BITBalanceContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, removeFromCart, updateQuantity, clearCart, itemCount, totalBIT, totalUSD } = useCart();
  const { balance, deductBalance, formatBalance } = useBITBalance();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: 'Cart is Empty',
        description: 'Add items to your cart before checking out',
        variant: 'destructive',
      });
      return;
    }

    const canPurchase = deductBalance(totalBIT);

    if (canPurchase) {
      toast({
        title: 'Purchase Successful! 🎉',
        description: `${itemCount} items purchased for ${totalBIT} BIT`,
      });
      clearCart();
      navigate('/dashboard');
    } else {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${totalBIT} BIT but only have ${formatBalance(balance)} BIT`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                    Shopping Cart
                  </CardTitle>
                  <CardDescription>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Your cart is empty</p>
                      <Button onClick={() => navigate('/dashboard')}>
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <Card key={item.id} className="border-border">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <h3 className="font-bold mb-1">{item.name}</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {item.size && (
                                    <Badge variant="outline" className="text-xs">
                                      Size: {item.size}
                                    </Badge>
                                  )}
                                  {item.color && (
                                    <Badge variant="secondary" className="text-xs">
                                      Color: {item.color}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-lg font-bold text-primary">{item.price}</span>
                                  <span className="text-sm text-muted-foreground">({item.usdPrice})</span>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>

                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {items.length > 0 && (
                        <Button
                          variant="outline"
                          onClick={clearCart}
                          className="w-full"
                        >
                          Clear Cart
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                      <span className="font-semibold">{totalBIT} BIT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">USD Equivalent</span>
                      <span className="font-semibold">${totalUSD.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-bold">Total</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{totalBIT} BIT</div>
                        <div className="text-sm text-muted-foreground">${totalUSD.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-3 mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
                      <p className="text-xl font-bold">{formatBalance(balance)} BIT</p>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={items.length === 0}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
