import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import {
  fetchTokenHolders,
  fetchTotalTransfers,
  fetch24HTransfers,
} from '@/utils/bscscan';

export const useTokenData = () => {
  const [holderCount, setHolderCount] = useState<number>(0);
  const [totalTransfers, setTotalTransfers] = useState<number>(0);
  const [transfers24h, setTransfers24h] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Fetch token name from smart contract
  const { data: tokenName } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN,
    abi: CONTRACT_ABIS.ERC20,
    functionName: 'name',
  });

  // Fetch token symbol from smart contract
  const { data: tokenSymbol } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN,
    abi: CONTRACT_ABIS.ERC20,
    functionName: 'symbol',
  });

  // Fetch total supply from smart contract
  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN,
    abi: CONTRACT_ABIS.ERC20,
    functionName: 'totalSupply',
  });

  // Fetch decimals from smart contract
  const { data: decimals } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN,
    abi: CONTRACT_ABIS.ERC20,
    functionName: 'decimals',
  });

  useEffect(() => {
    const loadApiData = async () => {
      setLoading(true);
      const [holderCountData, totalTransfersData, transfers24hData] = await Promise.all([
        fetchTokenHolders(),
        fetchTotalTransfers(),
        fetch24HTransfers(),
      ]);
      setHolderCount(holderCountData);
      setTotalTransfers(totalTransfersData);
      setTransfers24h(transfers24hData);
      setLoading(false);
    };

    loadApiData();
    // Refresh every 30 seconds
    const interval = setInterval(loadApiData, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    tokenName: tokenName as string || 'Bit Access',
    tokenSymbol: tokenSymbol as string || 'BIT',
    totalSupply: totalSupply ? formatUnits(totalSupply as bigint, 9) : '100000000000',
    decimals: decimals !== undefined ? Number(decimals) : 9,
    holderCount,
    totalTransfers,
    transfers24h,
    loading,
  };
};
