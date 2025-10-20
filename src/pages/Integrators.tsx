import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, MapPin, Store, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Integrators = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const merchants = [
    {
      name: 'Crypto Cafe',
      type: 'Restaurant',
      location: 'New York, USA',
      verified: true,
      description: 'Premium coffee shop accepting BIT tokens',
    },
    {
      name: 'Tech Haven',
      type: 'Electronics',
      location: 'San Francisco, USA',
      verified: true,
      description: 'Latest gadgets and tech accessories',
    },
    {
      name: 'Fashion Forward',
      type: 'Retail',
      location: 'London, UK',
      verified: true,
      description: 'Trendy clothing and accessories',
    },
    {
      name: 'Digital Delights',
      type: 'Services',
      location: 'Tokyo, Japan',
      verified: true,
      description: 'Digital services and subscriptions',
    },
    {
      name: 'Wellness Hub',
      type: 'Health',
      location: 'Sydney, Australia',
      verified: true,
      description: 'Health and wellness products',
    },
    {
      name: 'Book Nest',
      type: 'Books',
      location: 'Berlin, Germany',
      verified: true,
      description: 'Books, magazines, and digital content',
    },
  ];

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Integrators</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover merchants accepting BIT tokens worldwide
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, category, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Merchant Directory */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredMerchants.map((merchant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-primary transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Store className="w-10 h-10 text-primary" />
                    {merchant.verified && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{merchant.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Badge variant="outline" className="border-primary text-primary">
                        {merchant.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{merchant.location}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{merchant.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Map Section Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-3xl">Merchant Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Interactive Map Coming Soon</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    OpenStreetMap integration with merchant locations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Get Listed CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="p-12 text-center">
              <Store className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Are You a Merchant?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join our growing network of merchants accepting BIT tokens. Get faster settlements, lower fees, and
                access to a global Web3 community.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-lg px-8"
              >
                Apply to Get Listed
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Integrators;
