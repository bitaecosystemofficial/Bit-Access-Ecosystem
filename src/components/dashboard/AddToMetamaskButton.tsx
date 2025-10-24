import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import bitTokenIcon from '@/assets/bit-token-icon.png';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const AddToMetamaskButton = () => {
  const { isConnected } = useAccount();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Auto-hide after 5 seconds
    if (isVisible) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [isVisible]);

  const addTokenToMetamask = async () => {
    try {
      if (!window.ethereum) {
        toast.error('MetaMask is not installed');
        return;
      }

      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0xd3bDe17EbD27739cF5505Cd58Ecf31cB628E469c',
            symbol: 'BIT',
            decimals: 9,
            image: bitTokenIcon,
          },
        },
      });

      if (wasAdded) {
        toast.success('BIT Token added to MetaMask!');
      }
    } catch (error) {
      console.error('Error adding token to MetaMask:', error);
      toast.error('Failed to add token to MetaMask');
    }
  };

  if (!isConnected) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed right-4 top-20 z-40"
        >
          <Button
            onClick={addTokenToMetamask}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg flex items-center gap-2 px-4 py-2"
            size="sm"
          >
            <img src={bitTokenIcon} alt="BIT Token" className="w-5 h-5" />
            <span className="text-xs font-medium">Add to MetaMask</span>
            <Plus className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToMetamaskButton;
