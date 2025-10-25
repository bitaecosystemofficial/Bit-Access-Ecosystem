import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, AlertCircle, Wallet, Loader2, TrendingUp, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { bsc } from "wagmi/chains";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import usdtIcon from "@/assets/usdt-icon.png";
import usdcIcon from "@/assets/usdc-icon.png";
import bscIcon from "@/assets/bsc-icon.png";
import polygonIcon from "@/assets/polygon-icon.png";
import arbitrumIcon from "@/assets/arbitrum-icon.png";
import baseIcon from "@/assets/base-icon.png";
import bitLogo from "@/assets/bit-token-logo.png";

const TOTAL_PRESALE_ALLOCATION = 1_000_000_000; // 1 billion BIT tokens

const BuyBitTab = () => {
  const [amount, setAmount] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("BSC");
  const [paymentMethod, setPaymentMethod] = useState<"USDT" | "USDC">("USDT");
  const [isApproving, setIsApproving] = useState(false);
  const { toast } = useToast();
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending: isPurchasing } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const isBSCNetwork = chainId === bsc.id;
  const paymentTokenAddress = paymentMethod === "USDT" ? CONTRACT_ADDRESSES.USDT_TOKEN : CONTRACT_ADDRESSES.USDC_TOKEN;

  // Contract reads
  const { data: bitBalance, refetch: refetchBitBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address && isBSCNetwork },
  });

  const { data: contractPrice } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_PURCHASE,
    functionName: "pricePerBIT",
    query: { enabled: isBSCNetwork },
  });

  const { data: minPurchase } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_PURCHASE,
    functionName: "minimumPurchase",
    query: { enabled: isBSCNetwork },
  });

  const { data: contractBitBalance, refetch: refetchContractBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "balanceOf",
    args: [CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`],
    query: { enabled: isBSCNetwork },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: paymentTokenAddress as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "allowance",
    args: address ? [address as `0x${string}`, CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`] : undefined,
    query: { enabled: !!address && isBSCNetwork },
  });

  // Presale countdown
  const getPresaleEndDate = () => {
    const stored = localStorage.getItem("presaleEndDate");
    if (stored) return new Date(stored);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 120);
    localStorage.setItem("presaleEndDate", endDate.toISOString());
    return endDate;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const distance = getPresaleEndDate().getTime() - new Date().getTime();
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculated values
  const pricePerBit = contractPrice ? Number(formatUnits(contractPrice as bigint, 18)) : 0.000108;
  const minimumPurchase = minPurchase ? Number(formatUnits(minPurchase as bigint, 9)) : 100_000;
  const contractBalance = contractBitBalance ? Number(formatUnits(contractBitBalance as bigint, 9)) : 0;
  const totalSold = TOTAL_PRESALE_ALLOCATION - contractBalance;
  const soldPercentage = TOTAL_PRESALE_ALLOCATION > 0 ? (totalSold / TOTAL_PRESALE_ALLOCATION) * 100 : 0;

  const calculateBitAmount = (usdAmount: string): number => {
    const amt = parseFloat(usdAmount);
    if (isNaN(amt) || amt <= 0) return 0;
    const bitAmount = amt / pricePerBit;
    return Math.min(bitAmount, contractBalance);
  };

  const formatBitAmount = (usdAmount: string): string => {
    return calculateBitAmount(usdAmount).toLocaleString("en-US", { 
      maximumFractionDigits: 2,
      minimumFractionDigits: 2 
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetchBitBalance();
      refetchContractBalance();
      toast({
        title: "Purchase Successful! 🎉",
        description: "BIT tokens have been transferred to your wallet.",
      });
      setAmount("");
    }
  }, [isSuccess, refetchBitBalance, refetchContractBalance, toast]);

  const networks = [
    { name: "BSC", active: true, icon: bscIcon },
    { name: "Polygon", active: false, icon: polygonIcon },
    { name: "Arbitrum", active: false, icon: arbitrumIcon },
    { name: "Base", active: false, icon: baseIcon },
  ];

  const handleApprove = async () => {
    if (!address) {
      toast({ title: "Wallet Not Connected", description: "Please connect your wallet first", variant: "destructive" });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    if (!isBSCNetwork) {
      toast({ title: "Wrong Network", description: "Switching to BSC Mainnet..." });
      try {
        await switchChain({ chainId: bsc.id });
      } catch {
        toast({ title: "Network Switch Failed", description: "Please switch to BSC Mainnet manually", variant: "destructive" });
        return;
      }
    }

    setIsApproving(true);
    try {
      await writeContract({
        address: paymentTokenAddress as `0x${string}`,
        abi: CONTRACT_ABIS.ERC20,
        functionName: "approve",
        args: [CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`, parseUnits(amount, 18)],
      } as any);
      toast({ title: "Approval Submitted", description: `Approving ${paymentMethod} spend...` });
    } catch (error: any) {
      toast({ title: "Approval Failed", description: error?.shortMessage || "Failed to approve token", variant: "destructive" });
    } finally {
      setIsApproving(false);
      setTimeout(() => refetchAllowance(), 3000);
    }
  };

  const handleBuy = async () => {
    if (!address) {
      toast({ title: "Wallet Not Connected", description: "Please connect your wallet first", variant: "destructive" });
      return;
    }

    if (!isBSCNetwork) {
      toast({ title: "Wrong Network", description: "Switching to BSC Mainnet..." });
      try {
        await switchChain({ chainId: bsc.id });
      } catch {
        toast({ title: "Network Switch Failed", description: "Please switch to BSC Mainnet manually", variant: "destructive" });
        return;
      }
    }

    const usdAmountValue = parseFloat(amount);
    if (!amount || usdAmountValue <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid USD amount", variant: "destructive" });
      return;
    }

    const bitAmount = calculateBitAmount(amount);
    const minimumBitAmount = minimumPurchase;

    if (bitAmount < minimumBitAmount) {
      toast({
        title: "Minimum Purchase Required",
        description: `Minimum purchase is ${minimumBitAmount.toLocaleString()} BIT tokens`,
        variant: "destructive",
      });
      return;
    }

    if (bitAmount > contractBalance) {
      toast({
        title: "Exceeds Available Allocation",
        description: `Maximum available BIT: ${contractBalance.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    if (selectedNetwork !== "BSC") {
      toast({ title: "Network Coming Soon", description: `${selectedNetwork} network will be available soon` });
      return;
    }

    try {
      const usdAmount = parseUnits(amount, 18);
      const currentAllowance = (allowance as bigint) || BigInt(0);
      
      if (currentAllowance < usdAmount) {
        toast({ title: "Approval Required", description: `Please approve ${paymentMethod} spend first`, variant: "destructive" });
        return;
      }

      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`,
        abi: CONTRACT_ABIS.BIT_PURCHASE,
        functionName: "purchaseBIT",
        args: [paymentTokenAddress as `0x${string}`, usdAmount],
      } as any);
      
      toast({ title: "Purchase Submitted", description: `Buying ${formatBitAmount(amount)} BIT tokens...` });
    } catch (error: any) {
      toast({ title: "Purchase Failed", description: error?.shortMessage || "Transaction failed", variant: "destructive" });
    }
  };

  const isApprovalNeeded = !allowance || (allowance as bigint) < parseUnits(amount || "0", 18);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Presale Timer */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardHeader className="relative">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Presale Ends In</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Sec", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-lg p-3 w-full">
                    <div className="text-3xl font-bold text-primary text-center tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Sold */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-background to-background border-accent/20">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <CardHeader className="relative">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <CardTitle className="text-xl">Total BIT Sold</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tokens Sold</p>
                <p className="text-3xl font-bold text-accent">
                  {totalSold.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Progress</p>
                <p className="text-3xl font-bold text-accent">{soldPercentage.toFixed(2)}%</p>
              </div>
            </div>

            <div className="w-full bg-secondary/30 rounded-full h-3 overflow-hidden border border-accent/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${soldPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary via-accent to-primary relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 BIT</span>
              <span>{TOTAL_PRESALE_ALLOCATION.toLocaleString()} BIT</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-background border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Your BIT Balance</p>
                <div className="flex items-center gap-3">
                  <img src={bitLogo} alt="BIT" className="w-10 h-10" />
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {bitBalance ? Number(formatUnits(bitBalance as bigint, 9)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0"}
                    </p>
                    <p className="text-xs text-muted-foreground">BIT Tokens</p>
                  </div>
                </div>
              </div>
              <Wallet className="w-14 h-14 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-accent/5 to-background border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Available in Contract</p>
                <div className="flex items-center gap-3">
                  <img src={bitLogo} alt="BIT" className="w-10 h-10" />
                  <div>
                    <p className="text-3xl font-bold text-accent">
                      {contractBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                  </div>
                </div>
              </div>
              <ShoppingBag className="w-14 h-14 text-accent/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Form */}
      <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <CardHeader className="relative">
          <CardTitle className="text-2xl flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Purchase BIT Tokens
          </CardTitle>
          <CardDescription>Secure your BIT tokens at presale price</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-6">
          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              {["USDT", "USDC"].map((method) => (
                <Button
                  key={method}
                  variant={paymentMethod === method ? "default" : "outline"}
                  onClick={() => setPaymentMethod(method as "USDT" | "USDC")}
                  className="h-16 transition-all"
                >
                  <div className="flex flex-col items-center gap-1">
                    <img src={method === "USDT" ? usdtIcon : usdcIcon} alt={method} className="w-6 h-6" />
                    <span className="text-xs font-medium">{method}-BEP20</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Network Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Network</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {networks.map((network) => (
                <Button
                  key={network.name}
                  variant={selectedNetwork === network.name ? "default" : "outline"}
                  onClick={() => setSelectedNetwork(network.name)}
                  disabled={!network.active}
                  className="h-16 transition-all relative"
                >
                  <div className="flex flex-col items-center gap-1">
                    <img src={network.icon} alt={network.name} className="w-6 h-6" />
                    <span className="text-xs font-medium">{network.name}</span>
                    {network.active && (
                      <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1.5 py-0">
                        Active
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-base font-semibold">
              Amount ({paymentMethod})
            </Label>
            <div className="relative">
              <img
                src={paymentMethod === "USDT" ? usdtIcon : usdcIcon}
                alt={paymentMethod}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl h-14 pl-12 font-semibold bg-background/80 border-2 focus:border-primary"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Minimum: {minimumPurchase.toLocaleString()} BIT (≈ ${(minimumPurchase * pricePerBit).toFixed(2)} USD)
            </p>
          </div>

          {/* Purchase Summary */}
          {amount && parseFloat(amount) > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 p-6 rounded-xl space-y-3"
            >
              <h3 className="font-bold text-lg">Purchase Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">You Pay:</span>
                  <div className="flex items-center gap-2">
                    <img src={paymentMethod === "USDT" ? usdtIcon : usdcIcon} alt={paymentMethod} className="w-4 h-4" />
                    <span className="text-xl font-bold">
                      {parseFloat(amount).toLocaleString()} {paymentMethod}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price per BIT:</span>
                  <span className="font-semibold">${pricePerBit.toFixed(6)}</span>
                </div>
                <div className="border-t-2 border-border/50 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">You Receive:</span>
                    <span className="text-2xl font-bold text-primary">{formatBitAmount(amount)} BIT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {amount && parseFloat(amount) > 0 && isApprovalNeeded && (
              <Button
                onClick={handleApprove}
                disabled={!address || isApproving || selectedNetwork !== "BSC"}
                className="w-full h-14 text-lg font-bold"
                variant="secondary"
              >
                {isApproving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Approving...
                  </>
                ) : (
                  `Approve ${paymentMethod}`
                )}
              </Button>
            )}
            <Button
              onClick={handleBuy}
              disabled={
                !address ||
                isPurchasing ||
                isConfirming ||
                selectedNetwork !== "BSC" ||
                !amount ||
                parseFloat(amount) <= 0 ||
                isApprovalNeeded
              }
              className="w-full h-14 text-lg font-bold"
            >
              {isPurchasing || isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isConfirming ? "Confirming..." : "Processing..."}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {selectedNetwork !== "BSC" ? "Network Coming Soon" : !address ? "Connect Wallet" : "Buy BIT Tokens"}
                </>
              )}
            </Button>
          </div>

          {/* Info Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">How it works:</strong> Choose USDT-BEP20 or USDC-BEP20, enter your amount, and receive BIT tokens at ${pricePerBit.toFixed(6)} per token. Minimum purchase: {minimumPurchase.toLocaleString()} BIT. Tokens transfer instantly to your wallet on BSC network.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BuyBitTab;
