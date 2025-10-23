import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, TrendingUp, Users, Sparkles, Lock, Trophy, Palette, ShoppingCart, Search, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBITBalance } from '@/contexts/BITBalanceContext';

const NFTMarketplaceTab = () => {
  const { toast } = useToast();
  const { balance, deductBalance, formatBalance } = useBITBalance();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const nftCollections = [
    {
      name: 'BIT Genesis Collection',
      description: 'Exclusive founding member NFTs with lifetime benefits',
      supply: '1,000 NFTs',
      floor: '50 BIT',
      holders: '687',
      benefits: ['Governance Rights', 'Staking Bonus +5%', 'VIP Access'],
      status: 'live',
      category: 'Exclusive',
      date: '2025-01-15',
    },
    {
      name: 'BIT Rewards Passes',
      description: 'Seasonal NFT passes unlocking enhanced rewards',
      supply: '5,000 NFTs',
      floor: '25 BIT',
      holders: '3,421',
      benefits: ['2x Rewards Multiplier', 'Early Access', 'Exclusive Events'],
      status: 'live',
      category: 'Rewards',
      date: '2025-03-20',
    },
    {
      name: 'BIT Artist Series',
      description: 'Limited edition NFTs from partnered digital artists',
      supply: '500 NFTs',
      floor: '100 BIT',
      holders: '298',
      benefits: ['Art Gallery Access', 'Artist Airdrops', 'Community Recognition'],
      status: 'upcoming',
      category: 'Art',
      date: '2025-06-01',
    },
  ];

  const individualNFTs = [
    {
      name: 'Genesis Founder #001',
      description: 'Ultra rare founding member NFT',
      price: '500 BIT',
      usdPrice: '$62.50',
      rarity: 'Legendary',
      category: 'Exclusive',
      available: true,
      date: '2025-01-15',
    },
    {
      name: 'Genesis Founder #042',
      description: 'Rare founding member NFT',
      price: '250 BIT',
      usdPrice: '$31.25',
      rarity: 'Epic',
      category: 'Exclusive',
      available: true,
      date: '2025-01-20',
    },
    {
      name: 'Rewards Pass Q1 2026',
      description: 'Seasonal rewards multiplier pass',
      price: '100 BIT',
      usdPrice: '$12.50',
      rarity: 'Rare',
      category: 'Rewards',
      available: true,
      date: '2025-03-20',
    },
    {
      name: 'Artist Series: Digital Dreams',
      description: 'Exclusive digital art collaboration',
      price: '300 BIT',
      usdPrice: '$37.50',
      rarity: 'Epic',
      category: 'Art',
      available: false,
      date: '2025-06-01',
    },
  ];

  const marketplaceFeatures = [
    {
      icon: Palette,
      title: 'Create & Mint',
      description: 'Mint your own NFTs directly on the BIT platform with low fees',
    },
    {
      icon: ShoppingCart,
      title: 'Buy & Sell',
      description: 'Trade NFTs seamlessly using BIT tokens with zero gas fees',
    },
    {
      icon: Trophy,
      title: 'Earn Rewards',
      description: 'Holders earn passive BIT rewards based on rarity and holding time',
    },
    {
      icon: Lock,
      title: 'Stake NFTs',
      description: 'Lock your NFTs to earn boosted staking rewards and exclusive perks',
    },
  ];

  const filteredCollections = nftCollections
    .filter(collection => 
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase())
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

  const filteredNFTs = individualNFTs
    .filter(nft => 
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleMint = (collectionName: string) => {
    toast({
      title: 'Minting NFT',
      description: `Preparing to mint from ${collectionName}. Feature coming soon!`,
    });
  };

  const handleViewCollection = (collectionName: string) => {
    toast({
      title: 'View Collection',
      description: `Opening ${collectionName}. Marketplace launching Q1 2026!`,
    });
  };

  const handleAddToCart = (nft: typeof individualNFTs[0]) => {
    toast({
      title: 'Coming Soon',
      description: `${nft.name} has been added to your cart.`,
    });
  };

  const handleQuickBuy = (nftName: string) => {
    toast({
      title: 'Quick Buy',
      description: `Processing order for ${nftName}. Feature launching Q1 2026!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
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

      {/* Header */}
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Image className="w-8 h-8 text-primary" />
                NFT Marketplace
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Exclusive BIT Access NFT collections with utility and rewards
              </CardDescription>
            </div>
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
          </div>
        </CardHeader>
      </Card>

      {/* Search and Sort */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search collections by name, category..."
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

      {/* Marketplace Features */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Marketplace Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketplaceFeatures.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <feature.icon className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* NFT Collections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Collections</h2>
          <Badge variant="outline">{filteredCollections.length} results</Badge>
        </div>
        {filteredCollections.length === 0 ? (
          <Card className="bg-card/50 border-border">
            <CardContent className="p-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No collections found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg hover:shadow-primary/20 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{collection.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{collection.category}</Badge>
                    </div>
                    <Badge variant={collection.status === 'live' ? 'default' : 'secondary'}>
                      {collection.status === 'live' ? '🟢 Live' : '🔜 Coming Soon'}
                    </Badge>
                  </div>
                  <CardDescription>{collection.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Supply</p>
                      <p className="font-bold text-sm">{collection.supply}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Floor</p>
                      <p className="font-bold text-sm text-primary">{collection.floor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Holders</p>
                      <p className="font-bold text-sm flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {collection.holders}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-muted-foreground">
                    Launch Date: {new Date(collection.date).toLocaleDateString()}
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {collection.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleViewCollection(collection.name)}
                      variant="outline"
                      className="flex-1"
                      disabled={collection.status !== 'live'}
                    >
                      View Collection
                    </Button>
                    <Button
                      onClick={() => handleMint(collection.name)}
                      className="flex-1"
                      disabled={collection.status !== 'live'}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Mint
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Individual NFTs for Sale */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Available NFTs</h2>
          <Badge variant="outline">{filteredNFTs.length} results</Badge>
        </div>
        {filteredNFTs.length === 0 ? (
          <Card className="bg-card/50 border-border">
            <CardContent className="p-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No NFTs found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNFTs.map((nft, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg hover:shadow-primary/20 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{nft.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{nft.category}</Badge>
                    </div>
                    <Badge variant="default" className="bg-primary">
                      {nft.rarity}
                    </Badge>
                  </div>
                  <CardDescription>{nft.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{nft.price}</span>
                    <span className="text-sm text-muted-foreground">({nft.usdPrice})</span>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-muted-foreground">
                    Listed: {new Date(nft.date).toLocaleDateString()}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${nft.available ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm">
                      {nft.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleAddToCart(nft)}
                      variant="outline"
                      className="flex-1"
                      disabled={!nft.available}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleQuickBuy(nft.name)}
                      className="flex-1"
                      disabled={!nft.available}
                    >
                      Quick Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Coming Soon Banner */}
      <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-12 h-12 text-primary" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">NFT Marketplace Launching Q1 2026</h3>
              <p className="text-sm text-muted-foreground">
                Get ready for a full-featured NFT marketplace with staking, trading, and exclusive BIT holder benefits. 
                Early supporters will receive special genesis NFT airdrops!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NFTMarketplaceTab;