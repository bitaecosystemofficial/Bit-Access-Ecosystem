import { motion } from 'framer-motion';
import { Book, HelpCircle, Shield, FileText, Cookie, PieChart as PieChartIcon, TrendingUp, Target, Map } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Helpdesk = () => {
  const documentation = [
    {
      title: 'Integrate Wallet',
      content:
        'Connect your Web3 wallet using our secure Web3Modal integration. Supports MetaMask, WalletConnect, and more.',
    },
    {
      title: 'Earning BIT Rewards',
      content:
        'Customers automatically earn BIT tokens when merchants accept USDT/USDC payments. The more you shop, the more BIT you earn!',
    },
    {
      title: 'Merchant Onboarding',
      content: 'Step-by-step guide for merchants to accept USDT/USDC payments and automatically reward customers with BIT tokens.',
    },
    {
      title: 'Staking BIT Tokens',
      content: 'Lock your BIT rewards in our staking pools (180, 240, or 365 days) to earn up to 25% APY on your holdings.',
    },
  ];

  // Tokenomics Data
  const tokenAllocationData = [
    { name: 'Community Rewards', value: 30, color: '#FFD700' },
    { name: 'Staking Pools', value: 25, color: '#FFA500' },
    { name: 'Team & Advisors', value: 15, color: '#FF8C00' },
    { name: 'Development', value: 15, color: '#FF7F50' },
    { name: 'Marketing', value: 10, color: '#FF6347' },
    { name: 'Reserve Fund', value: 5, color: '#FF4500' },
  ];

  const fundAllocationData = [
    { name: 'Platform Development', value: 35, color: '#FFD700' },
    { name: 'Marketing & Growth', value: 25, color: '#FFA500' },
    { name: 'Operations', value: 20, color: '#FF8C00' },
    { name: 'Legal & Compliance', value: 10, color: '#FF7F50' },
    { name: 'Reserve', value: 10, color: '#FF6347' },
  ];

  const roadmapPhases = [
    {
      phase: 'Q1 2025',
      title: 'Foundation',
      items: [
        'Launch BIT token on BSC',
        'Deploy staking pools (180, 240, 365 days)',
        'Open merchant subscription program',
        'Community building & partnerships',
      ],
    },
    {
      phase: 'Q2 2025',
      title: 'Expansion',
      items: [
        'Launch on Polygon, Base, and Arbitrum',
        'Onboard 500+ merchant partners',
        'Mobile app development',
        'Enhanced analytics dashboard',
      ],
    },
    {
      phase: 'Q3 2025',
      title: 'Scale',
      items: [
        'International merchant expansion',
        'Advanced DeFi integrations',
        'DAO governance implementation',
        'Cross-chain bridge development',
      ],
    },
    {
      phase: 'Q4 2025',
      title: 'Maturity',
      items: [
        'Target 5,000+ active merchants',
        'Launch BIT debit card',
        'Major exchange listings',
        'Global partnerships & integrations',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I connect my wallet?',
      answer:
        'Click the "Connect Wallet" button in the navigation bar and select your preferred wallet provider. Follow the prompts to authorize the connection. Once connected, you\'ll be redirected to the dashboard.',
    },
    {
      question: 'What wallets are supported?',
      answer:
        'We support all major Web3 wallets including MetaMask, Coinbase Wallet, WalletConnect, and more through our Web3Modal integration.',
    },
    {
      question: 'How do I earn BIT tokens?',
      answer:
        'You earn BIT tokens automatically when you pay with USDT/USDC at participating merchants. Additionally, you can purchase BIT directly or stake your tokens to earn up to 25% APY.',
    },
    {
      question: 'What payment methods do merchants accept?',
      answer:
        'Merchants accept USDT and USDC stablecoins on BSC (with Polygon, Base, and Arbitrum coming soon). Customers receive BIT tokens as rewards for their purchases.',
    },
    {
      question: 'How does staking work?',
      answer:
        'You can lock your BIT tokens in one of three staking pools: 180 days (12% APY), 240 days (18% APY), or 365 days (25% APY). Rewards are calculated daily and distributed at maturity.',
    },
    {
      question: 'How do I become a merchant partner?',
      answer:
        'Visit the Dashboard and navigate to the Merchants Subscription tab. Choose a subscription plan (Starter, Professional, or Enterprise) and complete the registration process.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Helpdesk</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Bit Access
          </p>
        </motion.div>

        <Tabs defaultValue="docs" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9 mb-8 bg-card border border-border">
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="direction">Direction</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
            <TabsTrigger value="cookies">Cookies</TabsTrigger>
          </TabsList>

          {/* Documentation Tab */}
          <TabsContent value="docs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Book className="w-8 h-8 text-primary" />
                    <CardTitle className="text-3xl">Documentation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg mb-6">
                    <h3 className="text-2xl font-bold mb-3 text-primary flex items-center gap-2">
                      <FileText className="w-6 h-6" />
                      Whitepaper
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Read our comprehensive whitepaper detailing BIT Access tokenomics, merchant reward system, staking mechanisms, and our vision for revolutionizing Web3 payment ecosystems.
                    </p>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Download Whitepaper (PDF)
                    </Button>
                  </div>
                  {documentation.map((doc, index) => (
                    <div key={index} className="pb-6 border-b border-border last:border-0">
                      <h3 className="text-xl font-bold mb-3 text-primary">{doc.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{doc.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Tokenomics Tab */}
          <TabsContent value="tokenomics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <PieChartIcon className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle className="text-3xl">Tokenomics</CardTitle>
                      <CardDescription>BIT Token Economics & Distribution</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
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
                          <span className="font-bold text-primary">100,000,000 BIT</span>
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
                          0.5% of every transaction is burned, reducing total supply over time and increasing scarcity.
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Token Allocation */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl">Token Allocation</CardTitle>
                    <CardDescription>Distribution of 100M BIT tokens</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={tokenAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {tokenAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {tokenAllocationData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-bold">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Fund Allocation */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl">Fund Allocation</CardTitle>
                    <CardDescription>How raised funds will be used</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={fundAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {fundAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {fundAllocationData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-bold">{item.value}%</span>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Map className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle className="text-3xl">Roadmap</CardTitle>
                      <CardDescription>BIT Access development timeline for 2025</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {roadmapPhases.map((phase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative pl-8 border-l-2 border-primary/30"
                      >
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary border-4 border-background" />
                        <div className="pb-8">
                          <div className="flex items-center mb-2">
                            <span className="text-sm font-mono text-primary mr-3">{phase.phase}</span>
                            <h3 className="text-2xl font-bold">{phase.title}</h3>
                          </div>
                          <ul className="space-y-2 mt-4">
                            {phase.items.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <TrendingUp className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Project Direction Tab */}
          <TabsContent value="direction">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                      To bridge traditional commerce with Web3 technology by creating a reward ecosystem where merchants accept stablecoins (USDT/USDC) 
                      for payments and customers earn BIT tokens, fostering adoption and creating value for all participants.
                    </p>

                    <h3 className="text-2xl font-bold text-primary mb-4">Strategic Goals</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                        <h4 className="font-bold text-lg mb-2">Merchant Adoption</h4>
                        <p className="text-sm text-muted-foreground">
                          Onboard 10,000+ merchants globally by end of 2025, focusing on retail, hospitality, and e-commerce sectors.
                        </p>
                      </div>
                      <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                        <h4 className="font-bold text-lg mb-2">User Growth</h4>
                        <p className="text-sm text-muted-foreground">
                          Reach 500,000 active users earning and staking BIT rewards through merchant partnerships worldwide.
                        </p>
                      </div>
                      <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                        <h4 className="font-bold text-lg mb-2">Multi-Chain Expansion</h4>
                        <p className="text-sm text-muted-foreground">
                          Launch on Polygon, Base, and Arbitrum to provide users with flexible, low-cost transaction options.
                        </p>
                      </div>
                      <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                        <h4 className="font-bold text-lg mb-2">DeFi Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          Integrate with major DeFi protocols for enhanced liquidity and yield opportunities for BIT holders.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-primary mb-4">Long-Term Vision</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      BIT Access aims to become the leading Web3 rewards platform, where cryptocurrency payments are as common as traditional card payments. 
                      We envision a future where:
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
                        Whether you're a merchant looking to accept crypto payments, a customer wanting to earn rewards, or an investor 
                        believing in Web3's future, BIT Access offers opportunities for everyone to participate in the decentralized economy.
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                    By accessing and using Bit Access, you accept and agree to be bound by these terms and conditions.
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                    Cookies are small text files stored on your device that help us provide a better user experience.
                  </p>

                  <h3 className="text-xl font-bold text-primary mb-3">How We Use Cookies</h3>
                  <p className="text-muted-foreground mb-6">
                    We use cookies to remember your wallet connection, preferences, and to analyze site traffic. These
                    help us improve our services and user experience.
                  </p>

                  <h3 className="text-xl font-bold text-primary mb-3">Types of Cookies</h3>
                  <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                    <li>Essential cookies: Required for basic site functionality</li>
                    <li>Performance cookies: Help us analyze site usage</li>
                    <li>Functional cookies: Remember your preferences</li>
                  </ul>

                  <h3 className="text-xl font-bold text-primary mb-3">Managing Cookies</h3>
                  <p className="text-muted-foreground">
                    You can control cookies through your browser settings. Note that disabling cookies may affect site
                    functionality.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Helpdesk;
