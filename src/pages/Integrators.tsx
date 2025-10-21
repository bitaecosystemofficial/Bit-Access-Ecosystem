import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Store, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Integrators = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const merchantsPerPage = 5;

  const merchants = [
    {
      name: "SM City Cebu",
      type: "Mall",
      location: "Cebu City, Philippines",
      lat: 10.311,
      lng: 123.9185,
      verified: true,
      description: "Major shopping mall accepting BIT tokens",
    },
    {
      name: "Ayala Center Cebu",
      type: "Mall",
      location: "Cebu Business Park, Philippines",
      lat: 10.3181,
      lng: 123.9056,
      verified: true,
      description: "Premier shopping destination",
    },
    {
      name: "IT Park Food Court",
      type: "Food & Dining",
      location: "Cebu IT Park, Philippines",
      lat: 10.3267,
      lng: 123.9068,
      verified: true,
      description: "Tech hub dining area",
    },
    {
      name: "Robinsons Galleria",
      type: "Mall",
      location: "Cebu City, Philippines",
      lat: 10.3156,
      lng: 123.8854,
      verified: true,
      description: "Shopping and entertainment center",
    },
    {
      name: "Metro Gaisano Colon",
      type: "Retail",
      location: "Colon, Cebu City, Philippines",
      lat: 10.2963,
      lng: 123.901,
      verified: true,
      description: "Downtown shopping center",
    },
    {
      name: "Carbon Market",
      type: "Market",
      location: "Cebu City, Philippines",
      lat: 10.2929,
      lng: 123.9012,
      verified: true,
      description: "Historic public market",
    },
    {
      name: "Cafe Laguna Ayala",
      type: "Food & Dining",
      location: "Ayala Center, Cebu City",
      lat: 10.3175,
      lng: 123.905,
      verified: true,
      description: "Popular Filipino restaurant chain",
    },
    {
      name: "Bo's Coffee Club IT Park",
      type: "Food & Dining",
      location: "IT Park, Cebu City",
      lat: 10.327,
      lng: 123.907,
      verified: true,
      description: "Local coffee shop chain",
    },
    {
      name: "Gaisano Country Mall",
      type: "Mall",
      location: "Banilad, Cebu City",
      lat: 10.3365,
      lng: 123.9128,
      verified: true,
      description: "Community shopping center",
    },
    {
      name: "Parkmall Cebu",
      type: "Mall",
      location: "Mandaue City, Cebu",
      lat: 10.3333,
      lng: 123.9333,
      verified: true,
      description: "Family-friendly shopping mall",
    },
    {
      name: "Timezone SM Cebu",
      type: "Entertainment",
      location: "SM City Cebu",
      lat: 10.3112,
      lng: 123.9188,
      verified: true,
      description: "Gaming and entertainment center",
    },
    {
      name: "Jollibee Fuente",
      type: "Food & Dining",
      location: "Fuente Osmeña, Cebu City",
      lat: 10.31,
      lng: 123.895,
      verified: true,
      description: "Fast food restaurant",
    },
    {
      name: "Chowking Colon",
      type: "Food & Dining",
      location: "Colon Street, Cebu City",
      lat: 10.2965,
      lng: 123.9015,
      verified: true,
      description: "Chinese fast food chain",
    },
    {
      name: "Mango Square",
      type: "Entertainment",
      location: "General Maxilom Ave, Cebu City",
      lat: 10.32,
      lng: 123.9,
      verified: true,
      description: "Entertainment and dining complex",
    },
    {
      name: "The Walk IT Park",
      type: "Food & Dining",
      location: "IT Park, Cebu City",
      lat: 10.3268,
      lng: 123.9065,
      verified: true,
      description: "Food and lifestyle hub",
    },
    {
      name: "Mercury Drug Ayala",
      type: "Pharmacy",
      location: "Ayala Center, Cebu City",
      lat: 10.3178,
      lng: 123.9055,
      verified: true,
      description: "Leading pharmacy chain",
    },
    {
      name: "National Bookstore SM",
      type: "Retail",
      location: "SM City Cebu",
      lat: 10.3108,
      lng: 123.918,
      verified: true,
      description: "Bookstore and school supplies",
    },
    {
      name: "Penshoppe Ayala",
      type: "Retail",
      location: "Ayala Center, Cebu City",
      lat: 10.318,
      lng: 123.9058,
      verified: true,
      description: "Fashion retail store",
    },
    {
      name: "Watsons SM Cebu",
      type: "Retail",
      location: "SM City Cebu",
      lat: 10.3109,
      lng: 123.9182,
      verified: true,
      description: "Health and beauty store",
    },
    {
      name: "Bench Ayala",
      type: "Retail",
      location: "Ayala Center, Cebu City",
      lat: 10.3182,
      lng: 123.906,
      verified: true,
      description: "Local clothing brand",
    },
    {
      name: "Shakey's IT Park",
      type: "Food & Dining",
      location: "IT Park, Cebu City",
      lat: 10.3265,
      lng: 123.9067,
      verified: true,
      description: "Pizza restaurant chain",
    },
    {
      name: "Pizza Hut Ayala",
      type: "Food & Dining",
      location: "Ayala Center, Cebu City",
      lat: 10.3177,
      lng: 123.9053,
      verified: true,
      description: "International pizza chain",
    },
    {
      name: "KFC SM Cebu",
      type: "Food & Dining",
      location: "SM City Cebu",
      lat: 10.3111,
      lng: 123.9187,
      verified: true,
      description: "Fried chicken restaurant",
    },
    {
      name: "McDonald's Fuente",
      type: "Food & Dining",
      location: "Fuente Osmeña, Cebu City",
      lat: 10.3098,
      lng: 123.8948,
      verified: true,
      description: "Fast food restaurant",
    },
    {
      name: "Starbucks Ayala",
      type: "Food & Dining",
      location: "Ayala Center, Cebu City",
      lat: 10.3179,
      lng: 123.9057,
      verified: true,
      description: "International coffee chain",
    },
    {
      name: "Cebu Doctors' University",
      type: "Education",
      location: "Mandaue City, Cebu",
      lat: 10.328,
      lng: 123.94,
      verified: true,
      description: "Private university",
    },
    {
      name: "University of San Carlos",
      type: "Education",
      location: "Cebu City",
      lat: 10.305,
      lng: 123.89,
      verified: true,
      description: "Catholic university",
    },
    {
      name: "Fitness First Ayala",
      type: "Fitness",
      location: "Ayala Center, Cebu City",
      lat: 10.3183,
      lng: 123.9062,
      verified: true,
      description: "Fitness gym chain",
    },
    {
      name: "Gold's Gym IT Park",
      type: "Fitness",
      location: "IT Park, Cebu City",
      lat: 10.3269,
      lng: 123.9069,
      verified: true,
      description: "International fitness center",
    },
    {
      name: "Radisson Blu Hotel",
      type: "Hotel",
      location: "Cebu City",
      lat: 10.314,
      lng: 123.892,
      verified: true,
      description: "Luxury hotel",
    },
    {
      name: "Cebu Grand Hotel",
      type: "Hotel",
      location: "Cebu City",
      lat: 10.298,
      lng: 123.902,
      verified: true,
      description: "Business hotel",
    },
  ];

  const filteredMerchants = merchants.filter((merchant) => {
    const search = searchTerm.toLowerCase();
    return merchant.name.toLowerCase().includes(search) || merchant.location.toLowerCase().includes(search);
  });

  const totalPages = Math.ceil(filteredMerchants.length / merchantsPerPage);
  const startIndex = (currentPage - 1) * merchantsPerPage;
  const endIndex = startIndex + merchantsPerPage;
  const currentMerchants = filteredMerchants.slice(startIndex, endIndex);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([10.3157, 123.8854], 13);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    merchants.forEach((merchant) => {
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
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Merchant List */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            {currentMerchants.map((merchant, index) => (
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
          </div>

          {/* Right: OpenStreetMap */}
          <div className="col-span-2 lg:col-span-1 lg:sticky lg:top-24 h-[600px]">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2 mb-16"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="min-w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </motion.div>
        )}

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
