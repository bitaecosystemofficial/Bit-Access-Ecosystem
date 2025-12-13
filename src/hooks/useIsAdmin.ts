import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";

export const useIsAdmin = () => {
  const { address } = useAccount();

  // Check if user is contract owner
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
    abi: CONTRACT_ABIS.EXCHANGE_SHOP,
    functionName: "owner",
  });

  // Check if user is in admin whitelist
  const { data: isAdminWhitelisted } = useReadContract({
    address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
    abi: CONTRACT_ABIS.EXCHANGE_SHOP,
    functionName: "isAdmin",
    args: address ? [address] : undefined,
  });

  const isOwner = address && owner ? address.toLowerCase() === (owner as string).toLowerCase() : false;
  const isAdmin = isAdminWhitelisted === true || isOwner;

  return {
    isAdmin,
    isOwner,
    owner: owner as string | undefined,
  };
};
