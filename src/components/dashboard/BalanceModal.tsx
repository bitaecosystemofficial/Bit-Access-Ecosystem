import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import { formatUnits } from "viem";
import { Wallet } from "lucide-react";

interface BalanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BalanceModal = ({ open, onOpenChange }: BalanceModalProps) => {
  const { address } = useAccount();

  // BNB Balance
  const { data: bnbBalance } = useBalance({
    address: address,
  });

  // USDT Balance
  const { data: usdtBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.USDT_TOKEN,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  // USDC Balance
  const { data: usdcBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.USDC_TOKEN,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  // BIT Balance
  const { data: bitBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const balances = [
    {
      name: "BNB",
      balance: bnbBalance ? formatUnits(bnbBalance.value, bnbBalance.decimals) : "0",
      color: "text-yellow-500",
    },
    {
      name: "USDT",
      balance: usdtBalance ? formatUnits(usdtBalance as bigint, 18) : "0",
      color: "text-green-500",
    },
    {
      name: "USDC",
      balance: usdcBalance ? formatUnits(usdcBalance as bigint, 18) : "0",
      color: "text-blue-500",
    },
    {
      name: "BIT",
      balance: bitBalance ? formatUnits(bitBalance as bigint, 9) : "0",
      color: "text-primary",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Balances
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {balances.map((token) => (
            <div
              key={token.name}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <span className="font-medium text-foreground">{token.name}</span>
              <span className={`font-bold text-lg ${token.color}`}>
                {parseFloat(token.balance).toFixed(4)}
              </span>
            </div>
          ))}
        </div>
        {address && (
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
