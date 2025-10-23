import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, Package, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useBITBalance } from '@/contexts/BITBalanceContext';

const CartTab = () => {
  const { toast } = useToast();
  const { items, removeFromCart, updateQuantity, clearCart, itemCount, totalBIT, totalUSD } = useCart();
  const { balance, deductBalance, formatBalance } = useBITBalance();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: 'Cart is Empty',
        description: 'Add items to your cart before checkout',
        variant: 'destructive',
      });
      return;
    }

    const canPurchase = deductBalance(totalBIT);

    if (canPurchase) {
      clearCart();
      toast({
        title: 'Purchase Successful! 🎉',
        description: `${totalBIT} BIT deducted. Order confirmed. New balance: ${formatBalance(balance - totalBIT)} BIT`,
      });
    } else {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${totalBIT} BIT but only have ${formatBalance(balance)} BIT`,
        variant: 'destructive',
      });
    }
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: 'Item Removed',
      description: `${name} removed from cart`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl flex items-center gap-2">
                <ShoppingCart className="w-8 h-8 text-primary" />
                Shopping Cart
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </CardDescription>
            </div>
            {items.length > 0 && (
              <Button variant="outline" onClick={clearCart}>
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Balance Display */}
      <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatBalance(balance)} BIT
              </p>
            </div>
            <CreditCard className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </CardContent>
      </Card>

      {/* Cart Items or Empty State */}
      {items.length === 0 ? (
        <Card className="bg-card/50 border-border">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground">Browse merchandise to add items to your cart</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Item Icon */}
                    <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-10 h-10 text-primary" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.size && (
                          <Badge variant="outline" className="text-xs">
                            Size: {item.size}
                          </Badge>
                        )}
                        {item.color && (
                          <Badge variant="secondary" className="text-xs">
                            {item.color}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">{item.price}</span>
                        <span className="text-sm text-muted-foreground">({item.usdPrice})</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(item.id, item.name)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center gap-2 bg-secondary/30 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-8 text-center"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-primary">
                      {item.priceValue * item.quantity} BIT
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items ({itemCount})</span>
                    <span>{totalBIT} BIT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">USD Equivalent</span>
                    <span>${totalUSD.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{totalBIT} BIT</p>
                      <p className="text-sm text-muted-foreground">${totalUSD.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  disabled={items.length === 0 || balance < totalBIT}
                >
                  {balance < totalBIT ? 'Insufficient Balance' : 'Checkout'}
                </Button>

                {balance < totalBIT && items.length > 0 && (
                  <p className="text-sm text-destructive text-center">
                    You need {totalBIT - balance} more BIT
                  </p>
                )}

                {/* Info */}
                <div className="bg-secondary/30 p-4 rounded-lg space-y-2 text-xs">
                  <p className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Free shipping on orders over 500 BIT
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Secure payment with BIT tokens
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Instant transaction confirmation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartTab;
