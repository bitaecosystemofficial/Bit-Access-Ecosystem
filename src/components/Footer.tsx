import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Send, Github } from 'lucide-react';
import { motion } from 'framer-motion';
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
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
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
            <div className="flex space-x-4 mb-6">
              {socialLinks.map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={social.label}>
                  <social.icon size={20} />
                </a>)}
            </div>
            
            {/* Wallet Support */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 font-semibold">Supported Wallets</p>
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 p-2 shadow-md group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all">
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
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-orange-500 transition-colors">MetaMask</span>
                </motion.a>

                <motion.a
                  href="https://trustwallet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2 shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                    <svg viewBox="0 0 1024 1024" className="w-full h-full">
                      <circle cx="512" cy="512" r="512" fill="#3375BB"/>
                      <path d="M512 692L278.5 512 512 278.5 745.5 512z" fill="white"/>
                      <path d="M512 278.5L278.5 512l105 105L512 489z" fill="white" opacity="0.6"/>
                      <path d="M512 278.5L745.5 512l-105 105L512 489z" fill="white" opacity="0.8"/>
                      <path d="M512 692v160L278.5 617z" fill="white" opacity="0.6"/>
                      <path d="M512 692v160L745.5 617z" fill="white" opacity="0.8"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-blue-500 transition-colors">Trust Wallet</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col items-start space-y-2">
            <p className="text-sm text-muted-foreground">Copyright © 2024 - 2025. Bit Access Ecosystem. All Rights Reserved</p>
            <p className="text-sm text-muted-foreground">
              Powered by Web3Modal + WalletConnect
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;