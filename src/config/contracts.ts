// Smart Contract Addresses on BSC Network
export const CONTRACT_ADDRESSES = {
  // BIT Token Purchase Contract
  BIT_PURCHASE: '0x0000000000000000000000000000000000000000', // Replace with deployed address
  
  // BIT Staking Contract
  BIT_STAKING: '0x0000000000000000000000000000000000000000', // Replace with deployed address
  
  // Token Addresses on BSC
  BIT_TOKEN: '0x0000000000000000000000000000000000000000', // Replace with BIT token address
  USDT_TOKEN: '0x55d398326f99059fF775485246999027B3197955', // USDT on BSC
  USDC_TOKEN: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC on BSC
  
  // Receiver Wallet for USDT/USDC payments
  RECEIVER_WALLET: '0x0000000000000000000000000000000000000000', // Replace with your receiver wallet
};

// ABI imports
import BITTokenPurchaseABI from '@/contracts/abis/BITTokenPurchase.json';
import BITStakingABI from '@/contracts/abis/BITStaking.json';
import ERC20ABI from '@/contracts/abis/ERC20.json';

export const CONTRACT_ABIS = {
  BIT_PURCHASE: BITTokenPurchaseABI,
  BIT_STAKING: BITStakingABI,
  ERC20: ERC20ABI,
};

// Network configurations
export const SUPPORTED_NETWORKS = {
  BSC: {
    chainId: 56,
    name: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    blockExplorer: 'https://bscscan.com',
  },
  BSC_TESTNET: {
    chainId: 97,
    name: 'BNB Smart Chain Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorer: 'https://testnet.bscscan.com',
  },
};
