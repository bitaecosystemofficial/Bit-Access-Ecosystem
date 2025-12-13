import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Medal, Award, Clock, CheckCircle, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  id: string;
  wallet_address: string;
  tasks_completed: number;
  total_rewards: number;
  claimed: boolean;
  last_activity_at: string;
}

type SortField = 'tasks_completed' | 'total_rewards' | 'last_activity_at';
type SortOrder = 'asc' | 'desc';

export function AirdropLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortField, setSortField] = useState<SortField>('tasks_completed');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const pageSize = 10;

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Get total count
      const { count } = await supabase
        .from('leaderboard_stats')
        .select('*', { count: 'exact', head: true });
      
      setTotalCount(count || 0);

      // Fetch paginated data
      const { data, error } = await supabase
        .from('leaderboard_stats')
        .select('*')
        .order(sortField, { ascending: sortOrder === 'asc' })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [page, sortField, sortOrder]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('leaderboard-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboard_stats'
        },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [page, sortField, sortOrder]);

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

  const totalPages = Math.ceil(totalCount / pageSize);
  const startRank = (page - 1) * pageSize;

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>Airdrop Leaderboard</CardTitle>
          </div>
          
          {/* Sorting Controls */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select
              value={sortField}
              onValueChange={(value) => setSortField(value as SortField)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tasks_completed">Tasks Completed</SelectItem>
                <SelectItem value="total_rewards">Rewards Claimed</SelectItem>
                <SelectItem value="last_activity_at">Last Activity</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </Button>
          </div>
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
            {leaderboard.map((entry, index) => {
              const rank = startRank + index + 1;
              return (
                <div
                  key={entry.id}
                  className={`grid grid-cols-12 gap-2 px-3 py-3 rounded-lg items-center transition-colors ${
                    rank <= 3 ? 'bg-primary/5 border border-primary/10' : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>
                  <div className="col-span-3 font-mono text-sm">
                    {formatAddress(entry.wallet_address)}
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-medium">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      {entry.tasks_completed}/8
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-semibold text-primary">
                      {entry.total_rewards.toLocaleString()} BIT
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
                    {formatTimestamp(entry.last_activity_at)}
                  </div>
                </div>
              );
            })}

            {leaderboard.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No leaderboard entries yet. Be the first to complete tasks!
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {startRank + 1}-{Math.min(startRank + pageSize, totalCount)} of {totalCount}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
