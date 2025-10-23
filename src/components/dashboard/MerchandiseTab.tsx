import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingBag, Shirt, Package, Truck, Star, Gift, CreditCard, Search, Wallet, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useBITBalance } from '@/contexts/BITBalanceContext';

const MerchandiseTab = () => {
  const { toast } = useToast();
  const { addToCart, itemCount } = useCart();
  const { balance, deductBalance, formatBalance } = useBITBalance();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedItem, setSelectedItem] = useState<typeof filteredItems[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const merchandiseItems = [
    {
      category: 'Apparel',
      icon: Shirt,
      items: [
        {
          name: 'BIT Access Premium Hoodie',
          description: 'Premium cotton hoodie with embroidered logo',
          price: '150 BIT',
          priceValue: 150,
          usdPrice: '$18.75',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          colors: ['Black', 'Navy', 'Gray'],
          inStock: true,
          popular: true,
          date: '2025-02-10',
        },
        {
          name: 'BIT Logo T-Shirt',
          description: 'Comfortable cotton tee with screen-printed design',
          price: '75 BIT',
          priceValue: 75,
          usdPrice: '$9.38',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['White', 'Black', 'Blue'],
          inStock: true,
          popular: false,
          date: '2025-01-15',
        },
        {
          name: 'BIT Snapback Cap',
          description: 'Adjustable snapback with 3D embroidery',
          price: '100 BIT',
          priceValue: 100,
          usdPrice: '$12.50',
          sizes: ['One Size'],
          colors: ['Black', 'White', 'Navy'],
          inStock: true,
          popular: false,
          date: '2025-03-05',
        },
      ],
    },
    {
      category: 'Accessories',
      icon: Package,
      items: [
        {
          name: 'BIT Crypto Wallet (Hardware)',
          description: 'Secure hardware wallet with BIT branding',
          price: '400 BIT',
          priceValue: 400,
          usdPrice: '$50.00',
          sizes: ['One Size'],
          colors: ['Silver', 'Black'],
          inStock: true,
          popular: true,
          date: '2025-04-01',
        },
        {
          name: 'BIT Sticker Pack',
          description: 'Premium vinyl stickers (Pack of 10)',
          price: '40 BIT',
          priceValue: 40,
          usdPrice: '$5.00',
          sizes: ['Standard'],
          colors: ['Multi'],
          inStock: true,
          popular: false,
          date: '2025-01-20',
        },
        {
          name: 'BIT Metal Keychain',
          description: 'Premium metal keychain with logo',
          price: '60 BIT',
          priceValue: 60,
          usdPrice: '$7.50',
          sizes: ['One Size'],
          colors: ['Silver', 'Gold'],
          inStock: true,
          popular: false,
          date: '2025-02-15',
        },
      ],
    },
  ];

  const shippingInfo = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over 500 BIT' },
    { icon: Package, title: 'Secure Packaging', description: 'All items carefully packaged' },
    { icon: Star, title: 'Quality Guaranteed', description: 'Premium materials only' },
    { icon: Gift, title: 'Gift Wrapping', description: 'Available on request' },
  ];

  const allItems = merchandiseItems.flatMap(cat => 
    cat.items.map(item => ({ ...item, category: cat.category }))
  );

  const filteredItems = allItems
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });


  const handleViewDetails = (item: typeof filteredItems[0]) => {
    setSelectedItem(item);
    setSelectedSize(item.sizes[0] || '');
    setSelectedColor(item.colors[0] || '');
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        name: selectedItem.name,
        price: selectedItem.price,
        priceValue: selectedItem.priceValue,
        usdPrice: selectedItem.usdPrice,
        type: 'merchandise',
        size: selectedSize,
        color: selectedColor,
      });
    }

    toast({
      title: 'Added to Cart',
      description: `${quantity}x ${selectedItem.name} added to cart`,
    });
    setSelectedItem(null);
  };

  const handleQuickBuy = () => {
    if (!selectedItem) return;

    const totalCost = selectedItem.priceValue * quantity;
    const canPurchase = deductBalance(totalCost);

    if (canPurchase) {
      toast({
        title: 'Purchase Successful! 🎉',
        description: `${quantity}x ${selectedItem.name} purchased for ${totalCost} BIT`,
      });
      setSelectedItem(null);
    } else {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${totalCost} BIT but only have ${formatBalance(balance)} BIT`,
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl flex items-center gap-2">
                <ShoppingBag className="w-8 h-8 text-primary" />
                BIT Merchandise Store
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Exclusive BIT branded merchandise - Pay with BIT tokens
              </CardDescription>
            </div>
            <CreditCard className="w-12 h-12 text-primary" />
          </div>
        </CardHeader>
      </Card>

      {/* Balance Display */}
      <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your BIT Balance</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">{formatBalance(balance)}</p>
              <p className="text-sm text-muted-foreground">BIT Tokens</p>
            </div>
            <Wallet className="w-16 h-16 text-green-500 opacity-50" />
          </div>
        </CardContent>
      </Card>

      {/* Search and Sort */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search merchandise by name, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="category">Sort by Category</SelectItem>
                <SelectItem value="date">Sort by Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {shippingInfo.map((info, index) => (
          <Card key={index} className="bg-card/50 border-border">
            <CardContent className="p-4 text-center">
              <info.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-bold text-sm mb-1">{info.title}</h3>
              <p className="text-xs text-muted-foreground">{info.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Merchandise Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">All Products</h2>
          <Badge variant="outline">{filteredItems.length} results</Badge>
        </div>
        
        {filteredItems.length === 0 ? (
          <Card className="bg-card/50 border-border">
            <CardContent className="p-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, itemIndex) => (
              <Card key={itemIndex} className="bg-card border-border hover:shadow-lg hover:shadow-primary/20 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{item.category}</Badge>
                    </div>
                    {item.popular && (
                      <Badge variant="default" className="bg-primary">
                        🔥 Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    <span className="text-sm text-muted-foreground">({item.usdPrice})</span>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-muted-foreground">
                    Added: {new Date(item.date).toLocaleDateString()}
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Available Sizes:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.sizes.map((size, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Colors:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.colors.map((color, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm">
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleViewDetails(item)}
                      variant="outline"
                      className="flex-1"
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Member Benefits */}
      <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Star className="w-12 h-12 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">BIT Holder Exclusive Benefits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  10% discount for holders with 1,000+ BIT tokens
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  20% discount for stakers (active staking pool members)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Free shipping on all orders for Genesis NFT holders
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Early access to limited edition drops and collaborations
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon */}
      <Card className="bg-gradient-to-r from-primary/10 to-background border-primary/20">
        <CardContent className="p-6 text-center">
          <Package className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Merchandise Store Launching Q2 2026</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our exclusive merchandise store will feature premium BIT branded items, limited edition collaborations, 
            and special holder-only products. All purchases with BIT tokens at discounted rates!
          </p>
        </CardContent>
      </Card>

      {/* Item Details Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedItem?.name}</DialogTitle>
            <DialogDescription>{selectedItem?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image Placeholder */}
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <Package className="w-32 h-32 text-primary" />
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{selectedItem?.price}</span>
                <span className="text-lg text-muted-foreground">({selectedItem?.usdPrice})</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">per item</p>
            </div>

            {/* Size Selection */}
            {selectedItem && selectedItem.sizes.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-2 block">Select Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedItem.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Color Selection */}
            {selectedItem && selectedItem.colors.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-2 block">Select Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedItem.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
                <span className="text-2xl font-bold text-primary">
                  {selectedItem && selectedItem.priceValue * quantity} BIT
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleQuickBuy}
                  className="flex-1"
                  disabled={selectedItem && balance < selectedItem.priceValue * quantity}
                >
                  Quick Buy
                </Button>
              </div>

              {/* Cart Badge */}
              {itemCount > 0 && (
                <Button
                  variant="secondary"
                  className="w-full mt-3"
                  onClick={() => {
                    setSelectedItem(null);
                    // User can manually switch to cart tab
                  }}
                >
                  View Cart ({itemCount} items)
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MerchandiseTab;