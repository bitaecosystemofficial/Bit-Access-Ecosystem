import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, Clock, CheckCircle } from 'lucide-react';
import { formatEther } from 'viem';
import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';

interface LeaderboardEntry {
  address: string;
  tasksCompleted: number;
  claimed: boolean;
  totalRewards: string;
  timestamp?: string;
}

export function AirdropLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - in production, this would come from events/indexer
  useEffect(() => {
    // Simulated leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f3B7E8',
        tasksCompleted: 8,
        claimed: true,
        totalRewards: '2000',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
        tasksCompleted: 8,
        claimed: true,
        totalRewards: '2000',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        address: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
        tasksCompleted: 6,
        claimed: false,
        totalRewards: '1500',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        address: '0x583031D1113aD414F02576BD6afaBfb302140225',
        tasksCompleted: 5,
        claimed: false,
        totalRewards: '1250',
        timestamp: new Date(Date.now() - 345600000).toISOString(),
      },
      {
        address: '0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB',
        tasksCompleted: 4,
        claimed: false,
        totalRewards: '1000',
        timestamp: new Date(Date.now() - 432000000).toISOString(),
      },
    ];

    setLeaderboard(mockData);
    setLoading(false);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <CardTitle>Airdrop Leaderboard</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Wallet</div>
              <div className="col-span-2 text-center">Tasks</div>
              <div className="col-span-2 text-center">Rewards</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Time</div>
            </div>

            {/* Entries */}
            {leaderboard.map((entry, index) => (
              <div
                key={entry.address}
                className={`grid grid-cols-12 gap-2 px-3 py-3 rounded-lg items-center transition-colors ${
                  index < 3 ? 'bg-primary/5 border border-primary/10' : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="col-span-1 flex items-center justify-center">
                  {getRankIcon(index + 1)}
                </div>
                <div className="col-span-3 font-mono text-sm">
                  {formatAddress(entry.address)}
                </div>
                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    {entry.tasksCompleted}/8
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-sm font-semibold text-primary">
                    {entry.totalRewards} BIT
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  {entry.claimed ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                      Claimed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600">
                      Pending
                    </span>
                  )}
                </div>
                <div className="col-span-2 text-right text-xs text-muted-foreground flex items-center justify-end gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTimestamp(entry.timestamp)}
                </div>
              </div>
            ))}

            {leaderboard.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No leaderboard entries yet. Be the first to complete tasks!
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
