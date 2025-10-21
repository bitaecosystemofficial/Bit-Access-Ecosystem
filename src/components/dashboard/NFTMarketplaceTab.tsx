import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, TrendingUp, Users, Sparkles, Lock, Trophy, Palette, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NFTMarketplaceTab = () => {
  const { toast } = useToast();

  const nftCollections = [
    {
      name: 'BIT Genesis Collection',
      description: 'Exclusive founding member NFTs with lifetime benefits',
      supply: '1,000 NFTs',
      floor: '50 BIT',
      holders: '687',
      benefits: ['Governance Rights', 'Staking Bonus +5%', 'VIP Access'],
      status: 'live',
    },
    {
      name: 'BIT Rewards Passes',
      description: 'Seasonal NFT passes unlocking enhanced rewards',
      supply: '5,000 NFTs',
      floor: '25 BIT',
      holders: '3,421',
      benefits: ['2x Rewards Multiplier', 'Early Access', 'Exclusive Events'],
      status: 'live',
    },
    {
      name: 'BIT Artist Series',
      description: 'Limited edition NFTs from partnered digital artists',
      supply: '500 NFTs',
      floor: '100 BIT',
      holders: '298',
      benefits: ['Art Gallery Access', 'Artist Airdrops', 'Community Recognition'],
      status: 'upcoming',
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
        <h2 className="text-2xl font-bold mb-4">Featured Collections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nftCollections.map((collection, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg hover:shadow-primary/20 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{collection.name}</CardTitle>
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
