import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Store, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Integrators = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const merchants = [
    { name: 'SM City Cebu', type: 'Mall', location: 'Cebu City, Philippines', lat: 10.3110, lng: 123.9185, verified: true, description: 'Major shopping mall accepting BIT tokens' },
    { name: 'Ayala Center Cebu', type: 'Mall', location: 'Cebu Business Park, Philippines', lat: 10.3181, lng: 123.9056, verified: true, description: 'Premier shopping destination' },
    { name: 'IT Park Food Court', type: 'Food & Dining', location: 'Cebu IT Park, Philippines', lat: 10.3267, lng: 123.9068, verified: true, description: 'Tech hub dining area' },
    { name: 'Robinsons Galleria', type: 'Mall', location: 'Cebu City, Philippines', lat: 10.3156, lng: 123.8854, verified: true, description: 'Shopping and entertainment center' },
    { name: 'Metro Gaisano Colon', type: 'Retail', location: 'Colon, Cebu City, Philippines', lat: 10.2963, lng: 123.9010, verified: true, description: 'Downtown shopping center' },
    { name: 'Carbon Market', type: 'Market', location: 'Cebu City, Philippines', lat: 10.2929, lng: 123.9012, verified: true, description: 'Historic public market' },
    { name: 'Gaisano Country Mall', type: 'Mall', location: 'Banilad, Cebu City, Philippines', lat: 10.3380, lng: 123.9156, verified: true, description: 'Neighborhood shopping center' },
    { name: 'Fooda - Ayala Center', type: 'Food & Dining', location: 'Ayala Center Cebu, Philippines', lat: 10.3185, lng: 123.9060, verified: true, description: 'Premium food court' },
    { name: 'The Walk IT Park', type: 'Food & Dining', location: 'Cebu IT Park, Philippines', lat: 10.3265, lng: 123.9065, verified: true, description: 'Outdoor dining & entertainment' },
    { name: 'Parkmall Mandaue', type: 'Mall', location: 'Mandaue City, Philippines', lat: 10.3356, lng: 123.9453, verified: true, description: 'Major shopping complex' },
    { name: 'Elizabeth Mall', type: 'Mall', location: 'Cebu City, Philippines', lat: 10.2978, lng: 123.9015, verified: true, description: 'Downtown retail destination' },
    { name: 'Sugbo Mercado', type: 'Food & Dining', location: 'Cebu IT Park, Philippines', lat: 10.3270, lng: 123.9070, verified: true, description: 'Night food market' },
    { name: 'Larsian BBQ', type: 'Food & Dining', location: 'Fuente Osmeña, Cebu City, Philippines', lat: 10.3110, lng: 123.8970, verified: true, description: 'Famous street food destination' },
    { name: 'SM Seaside City', type: 'Mall', location: 'SRP, Cebu City, Philippines', lat: 10.2770, lng: 123.8848, verified: true, description: 'Largest shopping mall in the Philippines' },
    { name: 'J Centre Mall', type: 'Mall', location: 'Mandaue City, Philippines', lat: 10.3262, lng: 123.9392, verified: true, description: 'Mid-range shopping center' },
    { name: 'Taboan Public Market', type: 'Market', location: 'Cebu City, Philippines', lat: 10.3050, lng: 123.8955, verified: true, description: 'Traditional market for dried goods' },
    { name: 'Island Central Mall', type: 'Mall', location: 'Mactan, Lapu-Lapu City, Philippines', lat: 10.3102, lng: 123.9618, verified: true, description: 'Island shopping destination' },
    { name: 'Gaisano Grand Mall', type: 'Mall', location: 'Mactan, Lapu-Lapu City, Philippines', lat: 10.3125, lng: 123.9640, verified: true, description: 'Mactan retail center' },
    { name: 'Mabolo Market', type: 'Market', location: 'Mabolo, Cebu City, Philippines', lat: 10.3345, lng: 123.9095, verified: true, description: 'Community wet and dry market' },
    { name: 'Majestic Supermarket', type: 'Retail', location: 'Cebu City, Philippines', lat: 10.2958, lng: 123.9005, verified: true, description: 'Local supermarket chain' }
  ];

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const merchantsPerPage = 10;
  const totalPages = Math.ceil(filteredMerchants.length / merchantsPerPage);
  
  const paginatedMerchants = filteredMerchants.slice(
    (currentPage - 1) * merchantsPerPage,
    currentPage * merchantsPerPage
  );

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([10.3157, 123.8854], 13);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    merchants.forEach(merchant => {
      L.marker([merchant.lat, merchant.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${merchant.name}</b><br/>${merchant.type}<br/>${merchant.description}`);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

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

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {/* Left: Merchant List */}
          <div className="space-y-4">
            {paginatedMerchants.map((merchant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="bg-card border-border hover:border-primary transition-all duration-300">
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Right: OpenStreetMap */}
          <div className="sticky top-24 h-[600px]">
            <Card className="bg-card border-border h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Merchant Locations in Cebu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-80px)]">
                <div ref={mapRef} className="w-full h-full rounded-b-lg" />
              </CardContent>
            </Card>
          </div>
        </div>

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
