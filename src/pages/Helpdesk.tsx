import { motion } from 'framer-motion';
import { Book, HelpCircle, Shield, FileText, Cookie } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Helpdesk = () => {
  const documentation = [
    {
      title: 'Integrate Wallet',
      content:
        'Connect your Web3 wallet using our secure Web3Modal integration. Supports MetaMask, WalletConnect, and more.',
    },
    {
      title: 'Using BIT',
      content:
        'Learn how to earn, spend, and manage your BIT tokens across our ecosystem of participating merchants.',
    },
    {
      title: 'Merchant Onboarding',
      content: 'Step-by-step guide for merchants to integrate BIT payments into their business operations.',
    },
  ];

  const faqs = [
    {
      question: 'How do I connect my wallet?',
      answer:
        'Click the "Connect Wallet" button in the navigation bar and select your preferred wallet provider. Follow the prompts to authorize the connection.',
    },
    {
      question: 'What wallets are supported?',
      answer:
        'We support all major Web3 wallets including MetaMask, Coinbase Wallet, WalletConnect, and more through our Web3Modal integration.',
    },
    {
      question: 'How do I earn BIT tokens?',
      answer:
        'Earn BIT through staking, participating in ecosystem activities, merchant interactions, and referral programs.',
    },
    {
      question: 'Are there transaction fees?',
      answer:
        'Standard blockchain network fees apply. BIT transactions typically cost less than $0.50 and settle in under 2 seconds.',
    },
    {
      question: 'How do I become a merchant partner?',
      answer:
        'Visit our Integrators page and click "Apply to Get Listed". Complete the application form and our team will review your submission within 48 hours.',
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

        <Tabs defaultValue="docs" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="docs">Documentation</TabsTrigger>
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
