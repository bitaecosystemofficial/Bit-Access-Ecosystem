import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, ArrowLeft, Package, Truck, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useBITBalance } from '@/contexts/BITBalanceContext';

const MerchandiseDetails = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { addToCart, itemCount } = useCart();
  const { balance, deductBalance, formatBalance } = useBITBalance();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const itemName = searchParams.get('item');

  useEffect(() => {
    if (!isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  if (!isConnected || !itemName) {
    return null;
  }

  // Mock item data - in real app, fetch from API
  const item = {
    name: itemName,
    description: 'Premium quality merchandise with BIT branding',
    price: '150 BIT',
    priceValue: 150,
    usdPrice: '$18.75',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true,
    category: 'Apparel',
    features: [
      'Premium cotton material',
      'Embroidered BIT logo',
      'Machine washable',
      'Officially licensed',
    ],
  };

  useEffect(() => {
    if (item.sizes.length > 0) setSelectedSize(item.sizes[0]);
    if (item.colors.length > 0) setSelectedColor(item.colors[0]);
  }, []);

  const totalPrice = item.priceValue * quantity;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: 'Selection Required',
        description: 'Please select size and color',
        variant: 'destructive',
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${item.name}-${selectedSize}-${selectedColor}`,
        name: item.name,
        price: item.price,
        usdPrice: item.usdPrice,
        type: 'merchandise',
        size: selectedSize,
        color: selectedColor,
      });
    }
    toast({
      title: 'Added to Cart',
      description: `${quantity}x ${item.name} (${selectedSize}, ${selectedColor}) added to cart`,
    });
  };

  const handleQuickBuy = () => {
    const canPurchase = deductBalance(totalPrice);
    
    if (canPurchase) {
      toast({
        title: 'Purchase Successful! 🎉',
        description: `Purchased ${quantity}x ${item.name}. ${totalPrice} BIT deducted. New balance: ${formatBalance(balance - totalPrice)} BIT`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${totalPrice} BIT but only have ${formatBalance(balance)} BIT`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-20">
      <div className="container mx-auto px-4 pt-8">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Product Image */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <Package className="w-32 h-32 text-primary" />
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">{item.category}</Badge>
                    <CardTitle className="text-3xl">{item.name}</CardTitle>
                  </div>
                  {item.inStock && (
                    <Badge className="bg-green-500">In Stock</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-4">{item.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">{item.price}</span>
                    <span className="text-lg text-muted-foreground">({item.usdPrice})</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">per item</p>
                </div>

                {/* Balance */}
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Your Balance</p>
                  <p className="text-2xl font-bold text-primary">{formatBalance(balance)} BIT</p>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">Select Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {item.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">Select Color</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {item.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">Quantity</label>
                  <Select value={quantity.toString()} onValueChange={(v) => setQuantity(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((q) => (
                        <SelectItem key={q} value={q.toString()}>
                          {q}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">{totalPrice} BIT</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      variant="outline"
                      className="flex-1"
                      disabled={!item.inStock || !selectedSize || !selectedColor}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handleQuickBuy}
                      className="flex-1"
                      disabled={!item.inStock || balance < totalPrice || !selectedSize || !selectedColor}
                    >
                      Quick Buy
                    </Button>
                  </div>
                  <Button
                    onClick={() => navigate('/cart')}
                    variant="secondary"
                    className="w-full mt-2"
                  >
                    View Cart ({itemCount} items)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Product Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card className="bg-gradient-to-r from-primary/10 to-background border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over 500 BIT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MerchandiseDetails;
