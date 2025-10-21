import { motion } from "framer-motion";
import {
  Book,
  HelpCircle,
  Shield,
  FileText,
  Cookie,
  PieChart as PieChartIcon,
  TrendingUp,
  Target,
  Map,
  Gift,
  Users,
  Coins,
  Lock,
  Rocket,
  Globe,
  Vote,
  GraduationCap,
  Network,
  Send,
  CheckCircle,
  Circle,
  Clock,
  FileCheck2,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Repeat,
  Mail,
  Facebook,
  Twitter,
  MessageCircle,
  Github,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
const Helpdesk = () => {
  const whitepaperSections = [
    {
      title: "The Evolution of Blockchain and the Rise of BIT Access",
      content: `As the blockchain ecosystem continued to evolve, so did the vision of BIT Access. The project set out to bridge the gap between traditional industries and blockchain technology, exploring the advantages of using cryptocurrencies and decentralized applications (DApps) in areas such as:

• E-commerce: Revolutionizing online shopping by offering new payment methods, loyalty rewards, and rebate systems based on cryptocurrency.
• Business: Providing businesses with more efficient, secure, and transparent systems for transactions, supply chain management, and customer engagement.
• Education: Enabling educators and learners to interact in decentralized environments, tokenize learning content, and offer incentive-driven rewards using BIT tokens.
• Merchant Services: Empowering merchants to adopt decentralized payment systems, gain access to global markets, and benefit from lower transaction fees.

With the introduction of BIT Access, Dr. Duaso sought to create an ecosystem that provided individuals and businesses with the access and tools needed to thrive in an ever-changing digital landscape.`,
    },
    {
      title: "The Road Ahead: BIT Access as a Leading Digital Asset",
      content: `The concept of BIT Access goes beyond just cryptocurrency—it represents a shift in how digital assets and blockchain technologies will shape the future. By offering access to information, rewarding participants with tokens, and providing tools to foster innovation, BIT Access is positioned to become a leading force in the cryptocurrency and blockchain space.

BIT Access is not just about the future of decentralized finance (DeFi); it is about a larger vision of the future of digital assets in the next generation. Dr. Duaso and the team at BIT Access believe that BIT tokens will one day be recognized as one of the top digital assets in the cryptocurrency world.`,
    },
  ];

  // Token Usage
  const tokenUsage = [
    {
      icon: Gift,
      title: "Rewards System",
      description: "Incentives for community participation and ecosystem engagement",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Social-to-earn activities and community-driven initiatives",
    },
    {
      icon: Lock,
      title: "Staking & Rewards",
      description: "Earn passive income through token staking programs",
    },
    {
      icon: Rocket,
      title: "Platform Access",
      description: "Access to premium features and exclusive opportunities",
    },
    {
      icon: TrendingUp,
      title: "Ecosystem Growth",
      description: "Support for platform development and expansion",
    },
    {
      icon: Send,
      title: "Cross-Border Payments",
      description: "Enabling international transactions without traditional banking barriers",
    },
  ];

  // Key Features
  const keyFeatures = [
    {
      icon: Gift,
      title: "Rewards System",
      description: "Earn BIT tokens through community participation, staking, and ecosystem activities.",
    },
    {
      icon: Vote,
      title: "Community Governance",
      description: "Token holders can vote on important ecosystem decisions and proposals.",
    },
    {
      icon: GraduationCap,
      title: "Educational Incentives",
      description: "Learn about blockchain and earn rewards through our educational platform.",
    },
    {
      icon: Network,
      title: "Cross-Chain Compatibility",
      description: "Utilize BIT tokens across multiple blockchain networks seamlessly.",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Participate in community events, challenges and earn rewards.",
    },
    {
      icon: Globe,
      title: "Cross Border Payments",
      description: "Send and receive payments globally with low fees and fast settlement times.",
    },
  ];

  // Tokenomics Data
  const tokenAllocationData = [
    {
      name: "Project Development",
      value: 35.0,
      color: "#FFD700",
    },
    {
      name: "Company Reserved",
      value: 5.0,
      color: "#FFA500",
    },
    {
      name: "Token Burned",
      value: 10.0,
      color: "#FF4500",
    },
    {
      name: "P2P",
      value: 10.0,
      color: "#FF8C00",
    },
    {
      name: "Marketing",
      value: 10.0,
      color: "#FF7F50",
    },
    {
      name: "Liquidity CEX",
      value: 10.0,
      color: "#FF6347",
    },
    {
      name: "Presale",
      value: 5.0,
      color: "#FFB347",
    },
    {
      name: "Liquidity DEX",
      value: 5.0,
      color: "#FFA07A",
    },
    {
      name: "Management Team",
      value: 3.0,
      color: "#FA8072",
    },
    {
      name: "Foundation",
      value: 2.0,
      color: "#E9967A",
    },
    {
      name: "Emergency Fund",
      value: 2.0,
      color: "#F08080",
    },
    {
      name: "Staking",
      value: 1.0,
      color: "#CD5C5C",
    },
    {
      name: "Airdrops, Rewards & Bounty",
      value: 1.0,
      color: "#DC143C",
    },
    {
      name: "Creator Dev",
      value: 1.0,
      color: "#B22222",
    },
  ];
  const fundAllocationData = [
    {
      name: "Product Development",
      value: 17,
      color: "#FFD700",
    },
    {
      name: "Marketing",
      value: 14,
      color: "#FFA500",
    },
    {
      name: "Company Funds",
      value: 10,
      color: "#FF8C00",
    },
    {
      name: "Team",
      value: 9,
      color: "#FF7F50",
    },
    {
      name: "Business Operations",
      value: 9,
      color: "#FF6347",
    },
    {
      name: "Community Rewards",
      value: 8,
      color: "#FFB347",
    },
    {
      name: "Legal & Regulation",
      value: 6,
      color: "#FFA07A",
    },
    {
      name: "Taxes",
      value: 5,
      color: "#FA8072",
    },
    {
      name: "Contingency",
      value: 5,
      color: "#E9967A",
    },
    {
      name: "Sponsors & Partnerships",
      value: 5,
      color: "#F08080",
    },
    {
      name: "Advisors",
      value: 4,
      color: "#CD5C5C",
    },
    {
      name: "Charity Works",
      value: 4,
      color: "#DC143C",
    },
  ];
  const roadmapPhases = [
    {
      phase: "Q4 2024",
      title: "Foundation & Launch",
      status: "completed",
      items: [
        "Smart contract development and deployment",
        "Website and platform launch",
        "Initial community building",
        "Security audit completion",
        "Whitepaper release",
      ],
    },
    {
      phase: "Q1 2025",
      title: "Ecosystem Expansion",
      status: "completed",
      items: [
        "Airdrop campaign launch",
        "Staking platform activation",
        "Community governance implementation",
        "Partnership announcements",
        "Marketing campaign rollout",
      ],
    },
    {
      phase: "Q2 2025",
      title: "Platform Enhancement",
      status: "completed",
      items: [
        "Mobile app development",
        "Enhanced wallet integration",
        "Referral program launch",
        "Community rewards system",
        "Trading volume milestones",
      ],
    },
    {
      phase: "Q3 2025",
      title: "Growth & Integration",
      status: "completed",
      items: [
        "Cross-chain bridge development",
        "Strategic partnerships expansion",
        "NFT marketplace integration",
        "Advanced analytics dashboard",
        "Community voting mechanisms",
      ],
    },
    {
      phase: "Q4 2025",
      title: "Pre-Exchange Preparation",
      status: "current",
      progress: "Currently finalizing DEX listing requirements and expanding market maker network",
      items: [
        "DEX listing preparations and documentation",
        "Enhanced liquidity pool management",
        "Advanced security audits",
        "Market maker partnerships",
        "Global marketing campaign intensification",
      ],
    },
    {
      phase: "Q1 2026",
      title: "DEX Exchange Launch 🚀",
      status: "upcoming",
      items: [
        "Official DEX listing on major platforms",
        "PancakeSwap and Uniswap integration",
        "Liquidity provision programs",
        "Trading competitions and incentives",
        "Mass adoption marketing campaign",
      ],
    },
    {
      phase: "Q2 2026",
      title: "Post-DEX Growth",
      status: "upcoming",
      items: [
        "Additional DEX listings",
        "Enhanced trading features",
        "Institutional partnerships",
        "Advanced DeFi integrations",
        "Community expansion initiatives",
      ],
    },
    {
      phase: "Q3 2026",
      title: "CEX Exchange Launch 🎯",
      status: "upcoming",
      items: [
        "Centralized exchange listings (Binance, KuCoin, etc.)",
        "Fiat on-ramp integrations",
        "Global payment partnerships",
        "Enterprise solutions launch",
        "Mainstream media coverage",
      ],
    },
    {
      phase: "Q4 2026",
      title: "Ecosystem Maturity",
      status: "upcoming",
      items: [
        "Multi-chain expansion",
        "Advanced governance features",
        "Enterprise API launch",
        "Global merchant adoption",
        "Sustainable growth initiatives",
      ],
    },
  ];
  const longTermVision = {
    technology: [
      "Layer 2 scaling solutions",
      "AI-powered trading tools",
      "Quantum-resistant security",
      "Advanced DeFi protocols",
    ],
    globalExpansion: [
      "Worldwide merchant network",
      "Regional payment systems",
      "International partnerships",
      "Multi-language platform support",
    ],
  };
  const faqs = [
    {
      question: "How do I connect my wallet?",
      answer:
        'Click the "Connect Wallet" button in the navigation bar and select your preferred wallet provider. Follow the prompts to authorize the connection. Once connected, you\'ll be redirected to the dashboard.',
    },
    {
      question: "What wallets are supported?",
      answer:
        "We support all major Web3 wallets including MetaMask, Coinbase Wallet, WalletConnect, and more through our Web3Modal integration.",
    },
    {
      question: "How do I earn BIT tokens?",
      answer:
        "You earn BIT tokens automatically when you pay with USDT/USDC at participating merchants. Additionally, you can purchase BIT directly or stake your tokens to earn up to 25% APY.",
    },
    {
      question: "What payment methods do merchants accept?",
      answer:
        "Merchants accept USDT and USDC stablecoins on BSC (with Polygon, Base, and Arbitrum coming soon). Customers receive BIT tokens as rewards for their purchases.",
    },
    {
      question: "How does staking work?",
      answer:
        "You can lock your BIT tokens in one of three staking pools: 180 days (12% APY), 240 days (18% APY), or 365 days (25% APY). Rewards are calculated daily and distributed at maturity.",
    },
    {
      question: "How do I become a merchant partner?",
      answer:
        "Visit the Dashboard and navigate to the Merchants Subscription tab. Choose a subscription plan (Starter, Professional, or Enterprise) and complete the registration process.",
    },
  ];
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Helpdesk</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Bit Access
          </p>
        </motion.div>

        <Tabs defaultValue="docs" className="max-w-7xl mx-auto" orientation="vertical">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <TabsList className="flex flex-col h-auto w-full bg-card border border-border p-2 gap-1 lg:sticky lg:top-24">
                <TabsTrigger value="whitepaper" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Whitepaper
                </TabsTrigger>
                <TabsTrigger value="tokenomics" className="w-full justify-start">
                  <PieChartIcon className="w-4 h-4 mr-2" />
                  Tokenomics
                </TabsTrigger>
                <TabsTrigger value="allocation" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Allocation
                </TabsTrigger>
                <TabsTrigger value="roadmap" className="w-full justify-start">
                  <Map className="w-4 h-4 mr-2" />
                  Roadmap
                </TabsTrigger>
                <TabsTrigger value="audit" className="w-full justify-start">
                  <FileCheck2 className="w-4 h-4 mr-2" />
                  Security Audit
                </TabsTrigger>
                <TabsTrigger value="direction" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Direction
                </TabsTrigger>
                <TabsTrigger value="faq" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="privacy" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="terms" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms
                </TabsTrigger>
                <TabsTrigger value="cookies" className="w-full justify-start">
                  <Cookie className="w-4 h-4 mr-2" />
                  Cookies
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {/* Whitepaper Tab */}
              <TabsContent value="whitepaper">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <CardTitle className="text-3xl">BIT Access Whitepaper</CardTitle>
                            <CardDescription>
                              Comprehensive documentation of our vision, technology, and ecosystem
                            </CardDescription>
                          </div>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Evolution Section */}
                      {whitepaperSections.map((section, index) => (
                        <div key={index} className="pb-6 border-b border-border last:border-0">
                          <h3 className="text-2xl font-bold mb-4 text-primary">{section.title}</h3>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                        </div>
                      ))}

                      {/* Introduction Section */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">1.0 Introduction</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">1.1 Overview of BIT Access</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The BIT Access Ecosystem is an innovative, decentralized platform designed to bridge the
                            gaps across industries such as e-commerce, education, and merchant services, offering a
                            seamless, tokenized, and efficient way for users to interact with digital content, engage in
                            transactions, and access services. The ecosystem is powered by BIT tokens, the native
                            utility token, and is underpinned by blockchain technology, ensuring that all transactions,
                            interactions, and data exchanges are transparent, secure, and verifiable.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">1.2 Industry Challenges and Opportunities</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access addresses key challenges in e-commerce (fragmented payment systems, customer
                            loyalty issues), education (high costs, lack of personalized learning), and merchant
                            services (high operational costs, limited financial inclusion). The ecosystem offers
                            opportunities through tokenized rewards, cross-border low-cost payments, decentralized
                            marketplaces, tokenized learning, and financial inclusion solutions.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">1.3 The BIT Access Solution</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The BIT Access Ecosystem provides solutions through decentralized finance, tokenized
                            education, and decentralized e-commerce. By eliminating intermediaries and leveraging
                            blockchain technology, BIT Access creates a more efficient, user-centric digital ecosystem
                            that empowers individuals and businesses alike.
                          </p>
                        </div>
                      </div>

                      {/* Mission, Vision, Values */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">2.0 Mission, Vision, and Values</h2>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Mission Statement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              To create a decentralized ecosystem that empowers individuals, businesses, and educators
                              by leveraging blockchain technology to enhance digital transactions and value exchange.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Vision Statement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              To become a global leader in digital transformation across industries, creating a
                              transparent, secure, and decentralized digital economy.
                            </p>
                          </CardContent>
                        </Card>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">Core Values</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              {
                                title: "Innovation",
                                desc: "Commitment to continuous technological advancements",
                              },
                              {
                                title: "Decentralization",
                                desc: "Empowering users by removing centralized control",
                              },
                              {
                                title: "Integrity",
                                desc: "Maintaining transparency and ethical standards",
                              },
                              {
                                title: "Empowerment",
                                desc: "Supporting users with decentralized financial tools",
                              },
                              {
                                title: "Sustainability",
                                desc: "Building solutions for long-term growth",
                              },
                            ].map((value, idx) => (
                              <Card key={idx} className="bg-secondary/30">
                                <CardContent className="p-4">
                                  <h4 className="font-bold mb-2">{value.title}</h4>
                                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* BIT Access Ecosystem */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">3.0 The BIT Access Ecosystem</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.1 Decentralized E-Commerce Integration</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access enables secure, transparent transactions through blockchain, eliminating
                            intermediaries and reducing costs. Merchants benefit from payment systems with lower fees,
                            tokenized loyalty programs that increase customer retention, and the ability to tap into
                            global markets without currency conversion challenges.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.2 Education and Professional Development</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem offers decentralized learning platforms where educators can create and sell
                            courses while students access materials without traditional constraints. Blockchain
                            credentialing ensures achievements are verified and secure, while tokenized rewards
                            incentivize both learners and educators to engage and perform at their best.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.3 Tokenized Incentive and Rewards System</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT tokens function as the primary incentive within the ecosystem, rewarding consumers for
                            purchases and engagement, educators for quality content, and merchants for driving traffic
                            and transactions. Rebate programs, loyalty rewards, and community incentives promote
                            ecosystem growth and participation.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.4 Cross-Industry Innovation</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem facilitates cross-industry collaboration through interoperable blockchain
                            solutions, enabling value exchange across e-commerce, education, healthcare, entertainment,
                            and more. BIT tokens serve as a universal medium for transactions between different sectors,
                            creating new business models and opportunities.
                          </p>
                        </div>
                      </div>

                      {/* BIT Token */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">4.0 The BIT Token</h2>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>4.1 Overview of BIT Token</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-semibold">Standard</p>
                                <p className="text-muted-foreground">BEP-20 (Binance Smart Chain)</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Max Supply</p>
                                <p className="text-muted-foreground">100,000,000,000 BIT</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Contract Address</p>
                                <p className="text-muted-foreground font-mono text-xs">
                                  0xd3bde17ebd27739cf5505cd58ecf31cb628e469c
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Transaction Tax</p>
                                <p className="text-muted-foreground">3% Buy / 3% Sell</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">4.2 Token Use Cases and Utility</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              "E-commerce purchases with lower fees",
                              "Access to educational content",
                              "Staking programs for passive income",
                              "Liquidity provision rewards",
                              "Merchant loyalty programs",
                              "Customer engagement incentives",
                            ].map((use, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{use}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Technology Infrastructure */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">6.0 Technology Infrastructure</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">6.1 Blockchain Platform and Security</h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            BIT Access operates on the Binance Smart Chain (BSC) for its speed, low transaction costs,
                            and EVM compatibility.
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {[
                              "End-to-end encryption",
                              "Multi-signature wallets",
                              "Cryptographic hashing",
                              "Decentralized consensus (DPoS)",
                              "Regular security audits",
                              "User data protection",
                            ].map((feature, idx) => (
                              <Card key={idx} className="bg-secondary/30">
                                <CardContent className="p-3 flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">6.2 Smart Contracts and DApps</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Smart contracts automate transactions, escrow services, rebate programs, and staking rewards
                            with transparency and security. DApps enable peer-to-peer transactions for e-commerce,
                            tokenized educational content delivery, and decentralized marketplaces.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">6.3 Scalability and Performance</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Layered architecture for modular expansion, with plans to implement sharding and Layer-2
                            solutions for improved throughput. Cross-chain compatibility ensures interoperability, while
                            performance optimizations include low latency transactions and dynamic fee structures.
                          </p>
                        </div>
                      </div>

                      {/* Market Strategy */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">7.0 Market Strategy and Growth</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">7.1 Marketing and User Acquisition</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access employs airdrops, token incentives, referral programs, and influencer
                            partnerships to attract early adopters. Marketing strategies include social media
                            advertising, SEO/PPC campaigns, and content marketing, while conversion is optimized through
                            user education and continuous UX improvements.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">7.2 Global Expansion and Strategic Partnerships</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem will expand internationally through localized marketing campaigns and
                            establishing presence in key blockchain markets. Strategic partnerships with global
                            corporations, educational institutions, and cross-industry collaborations will drive token
                            integration across diverse sectors.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">7.3 Community Engagement</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Community growth is fostered through tokenized loyalty programs, regular airdrops, bounty
                            campaigns, active social media interaction, community events, and engagement with DeFi
                            communities.
                          </p>
                        </div>
                      </div>

                      {/* Legal & Compliance */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">
                          9.0 Legal Considerations and Regulatory Compliance
                        </h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">9.1 Legal Framework</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access operates within a robust legal framework including proper token classification as
                            a utility token, compliance with blockchain laws, adherence to data protection regulations
                            (GDPR/CCPA), AML/KYC procedures, intellectual property protections, and clear dispute
                            resolution mechanisms.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">9.2 Regulatory Compliance</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem maintains regulatory compliance across key markets including the US
                            (SEC/CFTC/FinCEN), EU (MiCA), UK (FCA), Asia-Pacific, and Latin America. It adheres to
                            international standards like FATF guidelines with regular audits and ongoing engagement with
                            regulators.
                          </p>
                        </div>
                      </div>

                      {/* Final Statements */}
                      <div className="space-y-6 pt-6 border-t border-border">
                        <h2 className="text-3xl font-bold text-primary">11.0 Final Statements</h2>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Summary of Benefits</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-muted-foreground leading-relaxed">
                              BIT Access stands as a pioneering decentralized platform designed to revolutionize
                              e-commerce, education, and financial services through the power of blockchain technology.
                              Key benefits include:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3 mt-4">
                              {[
                                "Decentralization & trustless transactions",
                                "Tokenized incentive programs",
                                "Scalability across industries",
                                "Transparency & security",
                                "Community-driven governance",
                                "Global reach & partnerships",
                              ].map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Call to Action</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              BIT Access invites you to be part of this revolutionary ecosystem. Whether you're looking
                              to invest, stake, or become a part of the growing decentralized economy, this is your
                              opportunity to join a transformative platform.
                            </p>
                            <p className="text-muted-foreground leading-relaxed font-semibold">
                              Join BIT Access today, and be a part of the future!
                            </p>
                          </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">Contact Us</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Website</p>
                                    <a
                                      href="https://bitaecosystem.org"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-sm break-all"
                                    >
                                      https://bitaecosystem.org
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Email</p>
                                    <a
                                      href="mailto:support@bitaecosystem.org"
                                      className="text-primary hover:underline text-sm break-all"
                                    >
                                      support@bitaecosystem.org
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Facebook className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Facebook</p>
                                    <a
                                      href="https://www.facebook.com/bitaecosystemofficial"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-sm"
                                    >
                                      @bitaecosystemofficial
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Twitter className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Twitter</p>
                                    <a
                                      href="https://x.com/bitaecosystem"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-sm"
                                    >
                                      @bitaecosystem
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Telegram</p>
                                    <a
                                      href="https://t.me/bitaecosystemofficial"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-sm"
                                    >
                                      @bitaecosystemofficial
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Github className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">GitHub</p>
                                    <a
                                      href="https://www.github.com/bitaecosystemofficial"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-sm"
                                    >
                                      @bitaecosystemofficial
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Tokenomics Tab */}
              <TabsContent value="tokenomics">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <PieChartIcon className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="text-3xl">Token Distribution & Allocation</CardTitle>
                          <CardDescription>
                            The BIT Token Distribution and Allocation outlines the planned distribution of the BIT
                            tokens to ensure a balanced, fair, and sustainable ecosystem.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Main Applications */}
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                        <h3 className="text-2xl font-bold mb-2 text-primary">Main Applications</h3>
                        <p className="text-muted-foreground">Business, E-commerce & Community Services</p>
                      </div>

                      {/* Token Usage */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Token Usage</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tokenUsage.map((item, index) => (
                            <Card
                              key={index}
                              className="bg-secondary/30 border-border hover:border-primary/50 transition-colors"
                            >
                              <CardContent className="p-4">
                                <item.icon className="w-8 h-8 text-primary mb-2" />
                                <h4 className="font-bold mb-1">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Key Features</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {keyFeatures.map((item, index) => (
                            <Card
                              key={index}
                              className="bg-secondary/30 border-border hover:border-primary/50 transition-colors"
                            >
                              <CardContent className="p-4 flex gap-3">
                                <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                  <h4 className="font-bold mb-1">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-primary">Key Metrics</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Token Name:</span>
                              <span className="font-bold">Bit Access (BIT)</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Total Supply:</span>
                              <span className="font-bold text-primary">100,000,000,000 BIT</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Decimals:</span>
                              <span className="font-bold text-primary">9</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Initial Price:</span>
                              <span className="font-bold">$0.00125 USDT/USDC</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Token Type:</span>
                              <span className="font-bold">Reward Token (BEP-20)</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Burn Mechanism:</span>
                              <span className="font-bold text-green-400">Active</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-primary">Staking APY</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-gradient-to-r from-blue-500/20 to-blue-500/5 rounded border border-blue-500/30">
                              <span className="font-bold">180 Days Lock:</span>
                              <span className="font-bold text-blue-400">12% APY</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-purple-500/20 to-purple-500/5 rounded border border-purple-500/30">
                              <span className="font-bold">240 Days Lock:</span>
                              <span className="font-bold text-purple-400">18% APY</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-primary/20 to-primary/5 rounded border border-primary/30">
                              <span className="font-bold">365 Days Lock:</span>
                              <span className="font-bold text-primary">25% APY</span>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                            <h4 className="font-bold mb-2">Deflationary Model</h4>
                            <p className="text-sm text-muted-foreground">
                              0.5% of every transaction is burned, reducing total supply over time and increasing
                              scarcity.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Token & Fund Allocation Tab */}
              <TabsContent value="allocation">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Token Distribution */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Token Distribution</CardTitle>
                        <CardDescription>Distribution of 100M BIT tokens</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <PieChart>
                            <Pie
                              data={tokenAllocationData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={90}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {tokenAllocationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-1.5 max-h-64 overflow-y-auto">
                          {tokenAllocationData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm py-1">
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded mr-2 flex-shrink-0"
                                  style={{
                                    backgroundColor: item.color,
                                  }}
                                />
                                <span className="text-xs">{item.name}</span>
                              </div>
                              <span className="font-bold text-xs">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Funding Allocation */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Funding Allocation</CardTitle>
                        <CardDescription>How raised funds will be used</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <PieChart>
                            <Pie
                              data={fundAllocationData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={90}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {fundAllocationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-1.5 max-h-64 overflow-y-auto">
                          {fundAllocationData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm py-1">
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded mr-2 flex-shrink-0"
                                  style={{
                                    backgroundColor: item.color,
                                  }}
                                />
                                <span className="text-xs">{item.name}</span>
                              </div>
                              <span className="font-bold text-xs">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Roadmap Tab */}
              <TabsContent value="roadmap">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Map className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="text-3xl">Roadmap</CardTitle>
                          <CardDescription>BIT Access development timeline to 2026 and beyond</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {roadmapPhases.map((phase, index) => {
                          const statusConfig = {
                            completed: {
                              icon: CheckCircle,
                              color: "text-green-500",
                              bg: "bg-green-500",
                              border: "border-green-500",
                            },
                            current: {
                              icon: Clock,
                              color: "text-primary",
                              bg: "bg-primary",
                              border: "border-primary",
                            },
                            upcoming: {
                              icon: Circle,
                              color: "text-muted-foreground",
                              bg: "bg-muted-foreground",
                              border: "border-muted-foreground",
                            },
                          };
                          const config = statusConfig[phase.status as keyof typeof statusConfig];
                          const StatusIcon = config.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{
                                opacity: 0,
                                x: -20,
                              }}
                              whileInView={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                delay: index * 0.1,
                              }}
                              viewport={{
                                once: true,
                              }}
                              className={`relative pl-8 border-l-2 ${phase.status === "current" ? "border-primary" : phase.status === "completed" ? "border-green-500" : "border-muted-foreground/30"}`}
                            >
                              <div
                                className={`absolute -left-3 top-0 w-6 h-6 rounded-full ${config.bg} border-4 border-background flex items-center justify-center`}
                              >
                                <StatusIcon className="w-3 h-3 text-background" />
                              </div>
                              <div
                                className={`pb-8 ${phase.status === "current" ? "bg-primary/5 -ml-4 pl-8 pr-4 py-4 rounded-lg border border-primary/20" : ""}`}
                              >
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span
                                    className={`text-sm font-mono ${config.color} font-bold px-2 py-1 rounded ${phase.status === "completed" ? "bg-green-500/10" : phase.status === "current" ? "bg-primary/10" : "bg-muted/30"}`}
                                  >
                                    {phase.phase}
                                  </span>
                                  <h3 className="text-2xl font-bold">{phase.title}</h3>
                                  {phase.status === "completed" && (
                                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full font-semibold">
                                      ✓ Completed
                                    </span>
                                  )}
                                  {phase.status === "current" && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-semibold">
                                      ● Current Phase
                                    </span>
                                  )}
                                  {phase.status === "upcoming" && (
                                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-semibold">
                                      Upcoming
                                    </span>
                                  )}
                                </div>
                                {phase.progress && (
                                  <div className="mb-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                                    <p className="text-sm font-semibold text-primary">Current Progress</p>
                                    <p className="text-sm text-muted-foreground mt-1">{phase.progress}</p>
                                  </div>
                                )}
                                <ul className="space-y-2 mt-4">
                                  {phase.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      {phase.status === "completed" ? (
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                      ) : phase.status === "current" ? (
                                        <div className="w-4 h-4 mr-2 mt-1 flex-shrink-0 rounded-full border-2 border-primary flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                      ) : (
                                        <Circle className="w-4 h-4 text-muted-foreground mr-2 mt-1 flex-shrink-0" />
                                      )}
                                      <span className={phase.status === "completed" ? "text-muted-foreground" : ""}>
                                        {item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Long-term Vision Section */}
                      <div className="mt-12 pt-8 border-t border-border">
                        <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                          <Rocket className="w-8 h-8 text-primary" />
                          Beyond 2026
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Our long-term vision extends beyond 2026 as we continue to innovate and expand the BIT Access
                          ecosystem:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Rocket className="w-6 h-6 text-primary" />
                                Technology Innovation
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {longTermVision.technology.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <TrendingUp className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Globe className="w-6 h-6 text-primary" />
                                Global Expansion
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {longTermVision.globalExpansion.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <TrendingUp className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Security Audit Tab */}
              <TabsContent value="audit">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                          <FileCheck2 className="w-8 h-8 text-primary" />
                          <div>
                            <CardTitle className="text-3xl">Security Self-Audit</CardTitle>
                            <CardDescription>Our commitment to security and transparency.</CardDescription>
                          </div>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Download as PDF
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Audit Summary */}
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Shield className="w-6 h-6" />
                          Audit Summary
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Contract Name</span>
                              <span className="text-primary font-mono">BITACCESSTOKEN</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Token Symbol</span>
                              <span className="text-primary font-mono">BIT</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Blockchain</span>
                              <span className="text-muted-foreground">BNB Chain</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Network</span>
                              <span className="text-muted-foreground">Mainnet / Testnet auto-detection</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Total Supply</span>
                              <span className="text-primary">100,000,000,000 BIT</span>
                            </div>
                            <div className="flex justify-between items-start text-sm">
                              <span className="text-muted-foreground"></span>
                              <span className="text-muted-foreground font-mono">1e11 * 10⁹</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Decimals</span>
                              <span className="text-muted-foreground">9</span>
                            </div>
                            <div className="flex justify-between items-start text-sm">
                              <span className="text-muted-foreground"></span>
                              <span className="text-muted-foreground">Less common,but not problematic</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Verified Source Code</span>
                              <span className="text-green-500 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                Yes - Fully verified
                              </span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Proxy Used</span>
                              <span className="text-muted-foreground">Non-Upgradeability</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Security & Safety Features */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <CheckCircle className="w-6 h-6" />
                          Security & Safety Features
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            {
                              feature: "Ownership Control",
                              status: "Yes",
                              note: "Secure, with owner functions gated",
                            },
                            {
                              feature: "Hidden Owner/Backdoor",
                              status: "None found",
                              note: "No hidden ownership mechanisms",
                            },
                            {
                              feature: "Blacklist/Whitelist",
                              status: "Whitelist present",
                              note: "Some addresses can be excluded from fees",
                            },
                            {
                              feature: "Self-Destruct",
                              status: "Not found",
                              note: "Cannot be destroyed",
                            },
                            {
                              feature: "Burn Functionality",
                              status: "Yes",
                              note: "Only callable by owner",
                            },
                            {
                              feature: "Gas Efficiency",
                              status: "No abuse found",
                              note: "",
                            },
                            {
                              feature: "Proxy/Upgradeable",
                              status: "No proxy used",
                              note: "",
                            },
                            {
                              feature: "Reentrancy",
                              status: "Protected",
                              note: "On airdrop & swap functions",
                            },
                            {
                              feature: "Tax Adjustable",
                              status: "Yes",
                              note: "Buy/sell tax adjustable by owner",
                            },
                            {
                              feature: "Anti-Whale",
                              status: "None",
                              note: "Unlimited transfers allowed",
                            },
                            {
                              feature: "Trading Lock",
                              status: "Yes",
                              note: "Trading cannot begin until enabled",
                            },
                            {
                              feature: "Blacklist Risk",
                              status: "None",
                              note: "No blacklist function present",
                            },
                            {
                              feature: "Cooldown Mechanism",
                              status: "None",
                              note: "",
                            },
                          ].map((item, idx) => (
                            <Card key={idx} className="bg-secondary/30 border-border">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-semibold text-sm">{item.feature}</span>
                                  <span className="text-primary text-sm font-mono">{item.status}</span>
                                </div>
                                {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Tokenomics & Fee Mechanics */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Coins className="w-6 h-6" />
                          Tokenomics & Fee Mechanics
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Card className="bg-secondary/30 border-border">
                            <CardContent className="p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="font-semibold">Initial Fees</span>
                                <span className="text-primary">3% Buy / 3% Sell / 0% Transfer</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Fee Receiver</span>
                                <span className="text-muted-foreground text-sm">feeReceiver address</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Can be updated by owner</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Max Buy Fee</span>
                                <span className="text-primary">5%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Hard limit enforced</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Max Sell Fee</span>
                                <span className="text-primary">5%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Hard limit enforced</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-secondary/30 border-border">
                            <CardContent className="p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="font-semibold">Total Fee Cap</span>
                                <span className="text-primary">10%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Buy + Sell must be ≤ 10%</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Excluded From Fees</span>
                                <span className="text-muted-foreground text-sm">Owner, contract, dead, PinkLock</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Swap Threshold</span>
                                <span className="text-muted-foreground text-sm">swapTokensAtAmount</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Initially 0.02% of total supply</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Swap for ETH</span>
                                <span className="text-green-500">Yes</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Fee tokens swapped for ETH via DEX</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Manual Swap</span>
                                <span className="text-muted-foreground">Not exposed</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Swap handled automatically</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      {/* Airdrop System */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Gift className="w-6 h-6" />
                          Airdrop System
                        </h3>
                        <Card className="bg-secondary/30 border-border">
                          <CardContent className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Total Airdrop Supply</span>
                                  <span className="text-primary">10,000,000 BIT</span>
                                </div>
                                <p className="text-xs text-muted-foreground">0.01% of total</p>
                                <div className="flex justify-between">
                                  <span className="font-semibold">Claimable Per Wallet</span>
                                  <span className="text-primary">1,000 BIT</span>
                                </div>
                                <p className="text-xs text-muted-foreground">One-time claim</p>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Airdrop Wallet</span>
                                  <span className="text-muted-foreground">Configurable</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Initially owner</p>
                                <div className="flex justify-between">
                                  <span className="font-semibold">Claim Limits</span>
                                  <span className="text-green-500">Enforced</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Can't exceed total, non-reentrant</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Holders & Distribution Risk */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Users className="w-6 h-6" />
                          Holders & Distribution Risk
                        </h3>
                        <Card className="bg-secondary/30 border-border">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Top 10 Holders Control</span>
                              <span className="text-orange-500 font-bold">92% of supply</span>
                            </div>
                            <p className="text-sm text-orange-400">⚠️ This is extremely centralized.</p>
                            <div className="flex justify-between">
                              <span className="font-semibold">Burned Tokens</span>
                              <span className="text-primary">10% sent to 0x...dead address</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* DEX & Liquidity */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Repeat className="w-6 h-6" />
                          DEX & Liquidity
                        </h3>
                        <Card className="bg-secondary/30 border-border">
                          <CardContent className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Router Supported</span>
                                  <span className="text-primary">PancakeSwap (BSC)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-semibold">Pair Created</span>
                                  <span className="text-green-500">N/A (BIT/WBNB)</span>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Liquidity Lock?</span>
                                  <span className="text-muted-foreground text-sm">Not verified in code</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  May depend on third-party locker (e.g., PinkLock)
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Risks / Considerations */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <AlertTriangle className="w-6 h-6" />
                          Risks / Considerations
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            {
                              risk: "Owner Controls Fees",
                              level: "Medium",
                              note: "Tax can be increased within limits (5% max each)",
                            },
                            {
                              risk: "Centralized Holdings",
                              level: "High",
                              note: "Top 5 holders = 70%+",
                            },
                            {
                              risk: "Whitelist Present",
                              level: "Medium",
                              note: "Some addresses may avoid fees",
                            },
                            {
                              risk: "Trading Lock Risk",
                              level: "Low",
                              note: "Owner must manually enable trading",
                            },
                            {
                              risk: "Swap Failure Handling",
                              level: "Safe",
                              note: "Swap errors are caught and logged, not reverted",
                            },
                            {
                              risk: "Mint Functionality",
                              level: "Controlled",
                              note: "Only internal minting, e.g., airdrop",
                            },
                          ].map((item, idx) => (
                            <Card
                              key={idx}
                              className={`border-border ${item.level === "High" ? "bg-red-500/10 border-red-500/30" : item.level === "Medium" ? "bg-orange-500/10 border-orange-500/30" : item.level === "Low" ? "bg-yellow-500/10 border-yellow-500/30" : "bg-green-500/10 border-green-500/30"}`}
                            >
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-semibold text-sm">{item.risk}</span>
                                  <span
                                    className={`text-sm font-bold ${item.level === "High" ? "text-red-500" : item.level === "Medium" ? "text-orange-500" : item.level === "Low" ? "text-yellow-500" : "text-green-500"}`}
                                  >
                                    {item.level}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground">{item.note}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Verdict */}
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <CheckCircle className="w-6 h-6" />
                          Verdict
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="font-bold">Security:</span>
                              <span className="text-green-500">✅ Well-structured</span>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              Secure ERC20 with trading protection and no critical vulnerabilities found.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="font-bold">Functionality:</span>
                              <span className="text-green-500">✅ Full support</span>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              Complete support for fees, liquidity, and airdrops.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-orange-500" />
                              <span className="font-bold">⚠️ Caution Points:</span>
                            </div>
                            <ul className="text-sm text-muted-foreground ml-7 space-y-1 list-disc list-inside">
                              <li>High token centralization among top holders.</li>
                              <li>Owner can adjust transaction taxes (within limits).</li>
                              <li>Whitelist allows exemptions.</li>
                            </ul>
                          </div>
                          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl font-bold text-orange-500">7/10</span>
                              <div>
                                <h4 className="font-bold text-orange-500">🟡 Moderate Risk</h4>
                                <p className="text-sm text-muted-foreground">Final Audit Rating</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                              <strong>Reason:</strong> While the contract is generally secure and transparent, the
                              extremely high concentration of token supply and whitelist flexibility introduce potential
                              manipulation or dumping risks, especially post-launch. Investors should monitor wallet
                              activity and ensure liquidity is locked before investing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Project Direction Tab */}
              <TabsContent value="direction">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Target className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="text-3xl">Project Direction</CardTitle>
                          <CardDescription>Our vision for the future of Web3 rewards</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="prose prose-invert max-w-none">
                        <h3 className="text-2xl font-bold text-primary mb-4">Mission Statement</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          To bridge traditional commerce with Web3 technology by creating a reward ecosystem where
                          merchants accept stablecoins (USDT/USDC) for payments and customers earn BIT tokens, fostering
                          adoption and creating value for all participants.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Strategic Goals</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">Merchant Adoption</h4>
                            <p className="text-sm text-muted-foreground">
                              Onboard 10,000+ merchants globally by end of 2025, focusing on retail, hospitality, and
                              e-commerce sectors.
                            </p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">User Growth</h4>
                            <p className="text-sm text-muted-foreground">
                              Reach 500,000 active users earning and staking BIT rewards through merchant partnerships
                              worldwide.
                            </p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">Multi-Chain Expansion</h4>
                            <p className="text-sm text-muted-foreground">
                              Launch on Polygon, Base, and Arbitrum to provide users with flexible, low-cost transaction
                              options.
                            </p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">DeFi Integration</h4>
                            <p className="text-sm text-muted-foreground">
                              Integrate with major DeFi protocols for enhanced liquidity and yield opportunities for BIT
                              holders.
                            </p>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-primary mb-4">Long-Term Vision</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          BIT Access aims to become the leading Web3 rewards platform, where cryptocurrency payments are
                          as common as traditional card payments. We envision a future where:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                          <li>Every merchant accepts stablecoins for instant, secure settlements</li>
                          <li>Customers automatically earn valuable BIT rewards with every purchase</li>
                          <li>Community governance shapes platform development through DAO mechanisms</li>
                          <li>Cross-border payments are seamless, fast, and cost-effective</li>
                          <li>BIT tokens provide real utility beyond speculation, driving ecosystem growth</li>
                        </ul>

                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-6">
                          <h3 className="text-2xl font-bold mb-3">Join Our Journey</h3>
                          <p className="text-muted-foreground">
                            Whether you're a merchant looking to accept crypto payments, a customer wanting to earn
                            rewards, or an investor believing in Web3's future, BIT Access offers opportunities for
                            everyone to participate in the decentralized economy.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-semibold">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Privacy Policy Tab */}
              <TabsContent value="privacy">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Shield className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Privacy Policy</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-bold text-primary mb-3">Data Collection</h3>
                      <p className="text-muted-foreground mb-6">
                        We collect minimal data necessary to provide our services. Wallet addresses and transaction data
                        are stored on the blockchain and are publicly accessible.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">Data Usage</h3>
                      <p className="text-muted-foreground mb-6">
                        Your data is used solely to facilitate transactions and improve our services. We never sell your
                        personal information to third parties.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">Security</h3>
                      <p className="text-muted-foreground mb-6">
                        We employ industry-standard security measures to protect your data. All sensitive operations are
                        executed on-chain with cryptographic verification.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">Your Rights</h3>
                      <p className="text-muted-foreground">
                        You have the right to access, modify, or delete your data at any time. Contact our support team
                        for assistance with data-related requests.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Terms of Use Tab */}
              <TabsContent value="terms">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Terms of Use</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-bold text-primary mb-3">Acceptance of Terms</h3>
                      <p className="text-muted-foreground mb-6">
                        By accessing and using Bit Access, you accept and agree to be bound by these terms and
                        conditions.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">User Responsibilities</h3>
                      <p className="text-muted-foreground mb-6">
                        Users are responsible for maintaining the security of their wallets and private keys. Bit Access
                        is not liable for losses due to user negligence.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">Token Usage</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT tokens are utility tokens for use within our ecosystem. They are not securities and do not
                        represent ownership or investment in the company.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">Limitation of Liability</h3>
                      <p className="text-muted-foreground">
                        Bit Access is provided "as is" without warranties. We are not liable for any indirect or
                        consequential damages arising from the use of our platform.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Cookie Policy Tab */}
              <TabsContent value="cookies">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Cookie className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Cookie Policy</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-bold text-primary mb-3">What Are Cookies?</h3>
                      <p className="text-muted-foreground mb-6">
                        Cookies are small text files stored on your device that help us provide a better user
                        experience.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">How We Use Cookies</h3>
                      <p className="text-muted-foreground mb-6">
                        We use cookies to remember your wallet connection, preferences, and to analyze site traffic.
                        These help us improve our services and user experience.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">Types of Cookies</h3>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li>Essential cookies: Required for basic site functionality</li>
                        <li>Performance cookies: Help us analyze site usage</li>
                        <li>Functional cookies: Remember your preferences</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">Managing Cookies</h3>
                      <p className="text-muted-foreground">
                        You can control cookies through your browser settings. Note that disabling cookies may affect
                        site functionality.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
export default Helpdesk;
