import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/overview', label: 'Overview' },
    { path: '/ecosystem', label: 'Ecosystem' },
    { path: '/integrators', label: 'Integrators' },
    { path: '/helpdesk', label: 'Helpdesk' },
  ];

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Bit Access</span>
            <span className="text-sm text-muted-foreground">(BIT)</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => open()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
            >
              {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                open();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
            >
              {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
