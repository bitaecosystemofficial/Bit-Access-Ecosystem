import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Shirt, Package, Truck, Star, Gift, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MerchandiseTab = () => {
  const { toast } = useToast();

  const merchandiseItems = [
    {
      category: 'Apparel',
      icon: Shirt,
      items: [
        {
          name: 'BIT Access Premium Hoodie',
          description: 'Premium cotton hoodie with embroidered logo',
          price: '150 BIT',
          usdPrice: '$18.75',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          colors: ['Black', 'Navy', 'Gray'],
          inStock: true,
          popular: true,
        },
        {
          name: 'BIT Logo T-Shirt',
          description: 'Comfortable cotton tee with screen-printed design',
          price: '75 BIT',
          usdPrice: '$9.38',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['White', 'Black', 'Blue'],
          inStock: true,
          popular: false,
        },
        {
          name: 'BIT Snapback Cap',
          description: 'Adjustable snapback with 3D embroidery',
          price: '100 BIT',
          usdPrice: '$12.50',
          sizes: ['One Size'],
          colors: ['Black', 'White', 'Navy'],
          inStock: true,
          popular: false,
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
          usdPrice: '$50.00',
          sizes: ['One Size'],
          colors: ['Silver', 'Black'],
          inStock: true,
          popular: true,
        },
        {
          name: 'BIT Sticker Pack',
          description: 'Premium vinyl stickers (Pack of 10)',
          price: '40 BIT',
          usdPrice: '$5.00',
          sizes: ['Standard'],
          colors: ['Multi'],
          inStock: true,
          popular: false,
        },
        {
          name: 'BIT Metal Keychain',
          description: 'Premium metal keychain with logo',
          price: '60 BIT',
          usdPrice: '$7.50',
          sizes: ['One Size'],
          colors: ['Silver', 'Gold'],
          inStock: true,
          popular: false,
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

  const handleAddToCart = (itemName: string, price: string) => {
    toast({
      title: 'Added to Cart',
      description: `${itemName} - ${price}. Merchandise store coming soon!`,
    });
  };

  const handleQuickBuy = (itemName: string) => {
    toast({
      title: 'Quick Buy',
      description: `Processing order for ${itemName}. Feature launching Q2 2026!`,
    });
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

      {/* Merchandise Categories */}
      {merchandiseItems.map((category, catIndex) => (
        <div key={catIndex}>
          <div className="flex items-center gap-2 mb-4">
            <category.icon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">{category.category}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item, itemIndex) => (
              <Card key={itemIndex} className="bg-card border-border hover:shadow-lg hover:shadow-primary/20 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
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
                      onClick={() => handleAddToCart(item.name, item.price)}
                      variant="outline"
                      className="flex-1"
                      disabled={!item.inStock}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleQuickBuy(item.name)}
                      className="flex-1"
                      disabled={!item.inStock}
                    >
                      Quick Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

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
    </motion.div>
  );
};

export default MerchandiseTab;
