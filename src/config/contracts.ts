// ABI imports
import BITTokenPurchaseABI from '@/contracts/abis/BITTokenPurchase.json';
import BITStakingABI from '@/contracts/abis/BITStaking.json';
import BITCommunityTasksABI from '@/contracts/abis/BITCommunityTasks.json';
import ERC20ABI from '@/contracts/abis/ERC20.json';

// Smart Contract Addresses on BSC Network
export const CONTRACT_ADDRESSES = {
  // BIT Token Purchase Contract
  BIT_PURCHASE: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with deployed address
  
  // BIT Staking Contract
  BIT_STAKING: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with deployed address
  
  // BIT Community Tasks Contract
  BIT_COMMUNITY_TASKS: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with deployed address
  
  // Token Addresses on BSC
  BIT_TOKEN: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with BIT token address
  USDT_TOKEN: '0x55d398326f99059fF775485246999027B3197955' as `0x${string}`, // USDT on BSC
  USDC_TOKEN: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' as `0x${string}`, // USDC on BSC
  
  // Receiver Wallet for USDT/USDC payments
  RECEIVER_WALLET: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with your receiver wallet
};

export const CONTRACT_ABIS = {
  BIT_PURCHASE: BITTokenPurchaseABI,
  BIT_STAKING: BITStakingABI,
  BITCommunityTasks: BITCommunityTasksABI,
  ERC20: ERC20ABI,
};

export const SUPPORTED_CHAINS = {
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
} as const;

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
