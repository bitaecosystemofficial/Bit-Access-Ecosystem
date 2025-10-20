import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Send, Github } from 'lucide-react';
import { useAccount } from 'wagmi';
const Footer = () => {
  const {
    isConnected
  } = useAccount();
  const socialLinks = [{
    icon: Facebook,
    href: '#',
    label: 'Facebook'
  }, {
    icon: Twitter,
    href: '#',
    label: 'X (Twitter)'
  }, {
    icon: Youtube,
    href: '#',
    label: 'YouTube'
  }, {
    icon: Send,
    href: '#',
    label: 'Telegram'
  }, {
    icon: Github,
    href: '#',
    label: 'GitHub'
  }];
  const importantLinks = [{
    path: '/',
    label: 'Home'
  }, {
    path: '/overview',
    label: 'Overview'
  }, {
    path: '/ecosystem',
    label: 'Ecosystem'
  }, {
    path: '/integrators',
    label: 'Integrators'
  }];
  const helpdeskLinks = [{
    path: '/helpdesk#docs',
    label: 'Documentation'
  }, {
    path: '/helpdesk#faq',
    label: 'FAQ'
  }, {
    path: '/helpdesk#privacy',
    label: 'Privacy Policy'
  }, {
    path: '/helpdesk#terms',
    label: 'Terms of Use'
  }];

  // If connected, only show copyright
  if (isConnected) {
    return <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">Copyright © 2024 - 2025. Bit Access Ecosystem. All Rights Reserved</p>
            <p className="text-sm text-muted-foreground">Powered by Binance Smart Chain Network</p>
          </div>
        </div>
      </footer>;
  }

  // Full footer when not connected
  return <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">Bit Access</span>
              <span className="text-sm text-muted-foreground">(BIT)</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Revolutionizing daily life through Web3. Empowering users and merchants worldwide.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              {importantLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Helpdesk Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Helpdesk</h3>
            <ul className="space-y-2">
              {helpdeskLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={social.label}>
                  <social.icon size={20} />
                </a>)}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 - 2025 Bit Access. All Rights Reserved
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by Web3Modal + WalletConnect
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;