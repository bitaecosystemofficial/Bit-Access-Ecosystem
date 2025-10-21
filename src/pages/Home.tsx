import { motion } from "framer-motion";
import {
  ArrowRight,
  Gift,
  Rocket,
  Lock,
  RefreshCw,
  Store,
  Users,
  Zap,
  Coins,
  TrendingUp,
  Shield,
  BarChart3,
  Network,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const { open } = useWeb3Modal();
  const navigate = useNavigate();

  const stats = [
    { label: "Community Members", value: "4K+", icon: Users },
    { label: "BIT Tokens", value: "100B", icon: Coins },
    { label: "Token Holders", value: "4,748", icon: TrendingUp },
    { label: "Token Transfers", value: "Live", icon: Zap, badge: true },
  ];

  const ecosystemFeatures = [
    {
      icon: Gift,
      title: "Airdrops & Rewards",
      description: "Participate in regular token airdrops and earn rewards through community engagement and referrals.",
    },
    {
      icon: Rocket,
      title: "Token Presale",
      description: "Early access to BIT tokens with bonus allocations and exclusive benefits for early supporters.",
    },
    {
      icon: Lock,
      title: "Staking Rewards",
      description: "Stake your BIT tokens to earn passive income while supporting network security and governance.",
    },
    {
      icon: RefreshCw,
      title: "Token Swap",
      description:
        "Seamlessly swap BIT tokens with other cryptocurrencies through our integrated decentralized exchange.",
    },
    {
      icon: Store,
      title: "Merchant Network",
      description: "Join our growing network of merchants accepting BIT tokens with special subscription packages.",
    },
    {
      icon: Users,
      title: "Community Hub",
      description:
        "Connect with fellow BIT holders, participate in social activities, and engage in community-driven initiatives.",
    },
    {
      icon: Zap,
      title: "Daily Rewards",
      description: "Try your luck with our daily claim game for a chance to win BIT tokens and other rewards.",
    },
    {
      icon: Network,
      title: "BSC Integration",
      description:
        "Built on Binance Smart Chain for fast, low-cost transactions and seamless integration with the BSC ecosystem.",
    },
  ];

  const blockchainNetworks = [
    {
      name: "BNB Chain",
      description: "Fast, low-cost transactions on BNB Smart Chain",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      name: "Polygon",
      description: "Scalable Ethereum Layer 2 solution",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Base",
      description: "Coinbase's Ethereum L2 network",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Arbitrum",
      description: "Optimistic rollup for Ethereum scaling",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  const partners = [
    { name: "Biit", category: "Blockchain Technology Provider" },
    { name: "Binexplorer", category: "BSC Blockchain Explorer" },
    { name: "DappRadar", category: "DApp Analytics" },
    { name: "GoPlus Security", category: "Security Platform" },
    { name: "BscScan", category: "BSC Explorer" },
    { name: "Cyberscope", category: "Smart Contract Audits" },
    { name: "NewGen Web3", category: "Web3 Community" },
    { name: "DexScreener", category: "DEX Analytics" },
    { name: "PancakeSwap", category: "BSC DEX" },
    { name: "Uniswap", category: "Decentralized Exchange" },
    { name: "CoinMarketCap", category: "Price Tracking" },
    { name: "CoinGecko", category: "Market Data" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <Badge className="mb-6 text-base px-4 py-2 bg-primary/20 text-primary border-primary/50">
              Unlocking Values, Empowering Communities
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Bit Access Ecosystem
            </h2>
            <p className="text-2xl md:text-3xl mb-4 text-foreground font-semibold">
              Powering the future of digital transactions
            </p>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Empowering blockchain communities through our comprehensive ecosystem and BIT utility token.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/ecosystem")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              >
                Explore
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                onClick={() => open()}
              >
                Connect Wallet
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-lg border-border hover:border-primary/50 transition-all"
              >
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                    {stat.value}
                    {stat.badge && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Features Section */}
      <section className="py-20 relative bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Ecosystem Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the full range of features and services available within the BitAccess ecosystem on Binance Smart
              Chain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Chain Network Support */}
      <section className="py-20 relative bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Cross-Chain Network Support</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BIT Token is available across multiple blockchain networks for maximum accessibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blockchainNetworks.map((network, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-all h-full group overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${network.color}`} />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-4 rounded-full bg-gradient-to-br ${network.color}`}>
                        <Network className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{network.name}</h3>
                    <p className="text-muted-foreground text-sm text-center">{network.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-20 relative bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Blockchain Strategic Partners</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic partnerships across major blockchain ecosystems, exchanges, and analytics platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 border-border hover:border-primary/50 hover:bg-card transition-all h-full group">
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 p-4 bg-primary/10 rounded-lg mx-auto w-fit group-hover:bg-primary/20 transition-colors">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-1 text-base">{partner.name}</h3>
                    <p className="text-xs text-muted-foreground">{partner.category}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-muted-foreground italic">
              Building the future through strategic blockchain integrations
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/80 backdrop-blur-lg border-primary/30 shadow-2xl shadow-primary/10">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl md:text-5xl font-bold mb-4">
                  Ready to Join the Bit Access Ecosystem?
                </CardTitle>
                <CardDescription className="text-lg md:text-xl max-w-3xl mx-auto">
                  Don't miss out on exclusive presale opportunities, airdrops, and early access to our complete
                  ecosystem of blockchain tools and services.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-4 pb-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Button
                    size="lg"
                    onClick={() => open()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
                  >
                    <Users className="mr-2" size={20} />
                    Bit Access Affiliates
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                    onClick={() => navigate("/helpdesk")}
                  >
                    <FileText className="mr-2" size={20} />
                    Explore Documentation
                  </Button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4" />
                    <span>Join 4,000+ community members building the future</span>
                  </div>
                  
                  <div className="border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground mb-4 font-semibold">Connect With Us</p>
                    <div className="flex items-center justify-center gap-6">
                      <motion.a
                        href="https://metamask.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-3 shadow-lg group-hover:shadow-xl group-hover:shadow-orange-500/50 transition-all">
                          <svg viewBox="0 0 318.6 318.6" className="w-full h-full">
                            <path fill="#E2761B" stroke="#E2761B" d="M274.1,35.5l-99.5,73.9L193,65.8z"/>
                            <path fill="#E4761B" stroke="#E4761B" d="M44.4,35.5l98.7,74.6l-17.5-44.3L44.4,35.5z"/>
                            <path fill="#E4761B" stroke="#E4761B" d="M238.3,206.8l-26.5,40.6l56.7,15.6l16.3-55.3L238.3,206.8z"/>
                            <path fill="#E4761B" stroke="#E4761B" d="M33.9,207.7L50.1,263l56.7-15.6l-26.5-40.6L33.9,207.7z"/>
                            <path fill="#E4761B" stroke="#E4761B" d="M103.6,138.2l-15.8,23.9l56.3,2.5l-2-60.5L103.6,138.2z"/>
                            <path fill="#E4761B" stroke="#E4761B" d="M214.9,138.2l-39.2-34.8l-1.3,61.2l56.2-2.5L214.9,138.2z"/>
                            <path fill="#E4761B" stroke="#E4761B" d="M106.8,247.4l33.8-16.5l-29.2-22.8L106.8,247.4z"/>
                            <path fill="#E4761B" stroke="#E4761B" d="M177.9,230.9l33.9,16.5l-4.7-39.3L177.9,230.9z"/>
                            <path fill="#D7C1B3" stroke="#D7C1B3" d="M211.8,247.4l-33.9-16.5l2.7,22.1l-0.3,9.3L211.8,247.4z"/>
                            <path fill="#D7C1B3" stroke="#D7C1B3" d="M106.8,247.4l31.5,14.9l-0.3-9.3l2.5-22.1L106.8,247.4z"/>
                            <path fill="#233447" stroke="#233447" d="M138.8,193.5l-28.2-8.3l19.9-9.1L138.8,193.5z"/>
                            <path fill="#233447" stroke="#233447" d="M179.7,193.5l8.3-17.4l20,9.1L179.7,193.5z"/>
                            <path fill="#CD6116" stroke="#CD6116" d="M106.8,247.4l4.8-40.6l-31.3,0.9L106.8,247.4z"/>
                            <path fill="#CD6116" stroke="#CD6116" d="M207,206.8l4.8,40.6l26.5-39.7L207,206.8z"/>
                            <path fill="#CD6116" stroke="#CD6116" d="M230.8,162.1l-56.2,2.5l5.2,28.9l8.3-17.4l20,9.1L230.8,162.1z"/>
                            <path fill="#CD6116" stroke="#CD6116" d="M110.6,185.2l20-9.1l8.2,17.4l5.3-28.9l-56.3-2.5L110.6,185.2z"/>
                            <path fill="#E4751F" stroke="#E4751F" d="M87.8,162.1l23.6,46l-0.8-22.9L87.8,162.1z"/>
                            <path fill="#E4751F" stroke="#E4751F" d="M208.1,185.2l-1.2,22.9l23.9-46L208.1,185.2z"/>
                            <path fill="#E4751F" stroke="#E4751F" d="M144.1,164.6l-5.3,28.9l6.6,34.1l1.5-44.9L144.1,164.6z"/>
                            <path fill="#E4751F" stroke="#E4751F" d="M174.6,164.6l-2.6,18l1.2,45.2l6.7-34.1L174.6,164.6z"/>
                            <path fill="#F6851B" stroke="#F6851B" d="M179.8,193.5l-6.7,34.1l4.8,3.3l29.2-22.8l1.2-22.9L179.8,193.5z"/>
                            <path fill="#F6851B" stroke="#F6851B" d="M110.6,185.2l0.8,22.9l29.2,22.8l4.8-3.3l-6.6-34.1L110.6,185.2z"/>
                            <path fill="#C0AD9E" stroke="#C0AD9E" d="M180.3,262.3l0.3-9.3l-2.5-2.2h-37.7l-2.3,2.2l0.3,9.3l-31.5-14.9l11,9l22.3,15.5h38.3l22.4-15.5l11-9L180.3,262.3z"/>
                            <path fill="#161616" stroke="#161616" d="M177.9,230.9l-4.8-3.3h-27.7l-4.8,3.3l-2.5,22.1l2.3-2.2h37.7l2.5,2.2L177.9,230.9z"/>
                            <path fill="#763D16" stroke="#763D16" d="M278.3,114.2l8.5-40.8l-12.7-37.9l-96.2,71.4l37,31.3l52.3,15.3l11.6-13.5l-5-3.6l8-7.3l-6.2-4.8l8-6.1L278.3,114.2z"/>
                            <path fill="#763D16" stroke="#763D16" d="M40.1,73.4l8.5,40.8l-5.4,4l8,6.1l-6.1,4.8l8,7.3l-5,3.6l11.5,13.5l52.3-15.3l37-31.3l-96.2-71.4L40.1,73.4z"/>
                            <path fill="#F6851B" stroke="#F6851B" d="M267.2,153.5l-52.3-15.3l15.9,23.9l-23.9,46l31.5-0.4h47.1L267.2,153.5z"/>
                            <path fill="#F6851B" stroke="#F6851B" d="M103.6,138.2l-52.3,15.3l-18.2,54.2h47.1l31.4,0.4l-23.6-46L103.6,138.2z"/>
                            <path fill="#F6851B" stroke="#F6851B" d="M174.6,164.6l3.3-57.7l15.2-41.1h-67.5l15.2,41.1l3.3,57.7l1.2,18.2l0.1,44.8h27.7l0.2-44.8L174.6,164.6z"/>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-foreground/80 group-hover:text-orange-500 transition-colors">MetaMask</span>
                      </motion.a>

                      <motion.a
                        href="https://trustwallet.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all">
                          <svg viewBox="0 0 1024 1024" className="w-full h-full">
                            <circle cx="512" cy="512" r="512" fill="#3375BB"/>
                            <path d="M512 692L278.5 512 512 278.5 745.5 512z" fill="white"/>
                            <path d="M512 278.5L278.5 512l105 105L512 489z" fill="white" opacity="0.6"/>
                            <path d="M512 278.5L745.5 512l-105 105L512 489z" fill="white" opacity="0.8"/>
                            <path d="M512 692v160L278.5 617z" fill="white" opacity="0.6"/>
                            <path d="M512 692v160L745.5 617z" fill="white" opacity="0.8"/>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-foreground/80 group-hover:text-blue-500 transition-colors">Trust Wallet</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
