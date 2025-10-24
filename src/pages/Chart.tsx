import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Users, ArrowUpDown } from "lucide-react";
import {
  fetchTop20Holders,
  fetchLatestTransactions,
  fetchTokenInfo,
  formatAddress,
  formatTokenAmount,
  type TokenHolder,
  type Transaction,
  type TokenInfo,
} from "@/utils/bscscan";
import { Skeleton } from "@/components/ui/skeleton";

export default function Chart() {
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [holdersData, txData, infoData] = await Promise.all([
        fetchTop20Holders(),
        fetchLatestTransactions(),
        fetchTokenInfo(),
      ]);
      setHolders(holdersData);
      setTransactions(txData);
      setTokenInfo(infoData);
      setLoading(false);
    };

    loadData();
    // Refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            BIT Token Analytics
          </h1>
          <p className="text-muted-foreground mb-8">Real-time blockchain data from BSCScan</p>

          {/* Token Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Supply</p>
                  {loading ? (
                    <Skeleton className="h-8 w-32" />
                  ) : (
                    <p className="text-2xl font-bold">
                      {tokenInfo ? formatTokenAmount(tokenInfo.totalSupply, tokenInfo.decimals) : "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Token Symbol</p>
                  {loading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <p className="text-2xl font-bold">{tokenInfo?.symbol || "BIT"}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ArrowUpDown className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Decimals</p>
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <p className="text-2xl font-bold">{tokenInfo?.decimals || "18"}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Top 20 Holders */}
          <Card className="p-6 mb-8 backdrop-blur-sm bg-card/50 border-primary/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Top 20 Token Holders
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-8" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : holders.length > 0 ? (
                    holders.map((holder, index) => (
                      <TableRow key={holder.TokenHolderAddress}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <a
                            href={`https://bscscan.com/address/${holder.TokenHolderAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            {formatAddress(holder.TokenHolderAddress)}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatTokenAmount(holder.TokenHolderQuantity, tokenInfo?.decimals || "18")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No holder data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Latest Transactions */}
          <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ArrowUpDown className="w-6 h-6 text-primary" />
              Latest 10 Transactions
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hash</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : transactions.length > 0 ? (
                    transactions.map((tx) => (
                      <TableRow key={tx.hash}>
                        <TableCell>
                          <a
                            href={`https://bscscan.com/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            {formatAddress(tx.hash)}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://bscscan.com/address/${tx.from}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {formatAddress(tx.from)}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://bscscan.com/address/${tx.to}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {formatAddress(tx.to)}
                          </a>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatTokenAmount(tx.value, tx.tokenDecimal)}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No transaction data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
