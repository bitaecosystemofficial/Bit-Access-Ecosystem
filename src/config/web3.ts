import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';

export const projectId = 'e277359f0fca74fc6f379c202652ad12';

const metadata = {
  name: 'Bit Access',
  description: 'Revolutionizing Daily Life Through Web3',
  url: 'https://bitaccess.io',
  icons: ['https://bitaccess.io/icon.png']
};

const chains = [mainnet, polygon, arbitrum, optimism] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: false,
  storage: createStorage({
    storage: cookieStorage
  }),
});
