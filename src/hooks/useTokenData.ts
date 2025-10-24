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

  // Fetch holder count every 4 hours
  useEffect(() => {
    const loadHolderData = async () => {
      const holderCountData = await fetchTokenHolders();
      setHolderCount(holderCountData);
    };

    loadHolderData();
    // Refresh every 4 hours (14400000 ms)
    const holderInterval = setInterval(loadHolderData, 4 * 60 * 60 * 1000);
    return () => clearInterval(holderInterval);
  }, []);

  // Fetch transfer data every 30 seconds
  useEffect(() => {
    const loadTransferData = async () => {
      setLoading(true);
      const [totalTransfersData, transfers24hData] = await Promise.all([
        fetchTotalTransfers(),
        fetch24HTransfers(),
      ]);
      setTotalTransfers(totalTransfersData);
      setTransfers24h(transfers24hData);
      setLoading(false);
    };

    loadTransferData();
    // Refresh every 30 seconds
    const transferInterval = setInterval(loadTransferData, 30000);
    return () => clearInterval(transferInterval);
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
