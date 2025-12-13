-- Create airdrop_events table for tracking task completions and claims
CREATE TABLE public.airdrop_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_address TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('task_completed', 'airdrop_claimed')),
    task_id TEXT,
    tasks_completed INTEGER NOT NULL DEFAULT 0,
    total_rewards NUMERIC NOT NULL DEFAULT 0,
    claimed BOOLEAN NOT NULL DEFAULT false,
    tx_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index for wallet address to aggregate user stats
CREATE INDEX idx_airdrop_events_wallet ON public.airdrop_events(wallet_address);
CREATE INDEX idx_airdrop_events_created ON public.airdrop_events(created_at DESC);

-- Create admin_wallets table for Exchange Shop admin access
CREATE TABLE public.admin_wallets (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_address TEXT NOT NULL UNIQUE,
    label TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leaderboard_stats table for aggregated user stats (for faster queries)
CREATE TABLE public.leaderboard_stats (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_address TEXT NOT NULL UNIQUE,
    tasks_completed INTEGER NOT NULL DEFAULT 0,
    total_rewards NUMERIC NOT NULL DEFAULT 0,
    claimed BOOLEAN NOT NULL DEFAULT false,
    last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_leaderboard_stats_tasks ON public.leaderboard_stats(tasks_completed DESC);
CREATE INDEX idx_leaderboard_stats_rewards ON public.leaderboard_stats(total_rewards DESC);
CREATE INDEX idx_leaderboard_stats_activity ON public.leaderboard_stats(last_activity_at DESC);

-- Enable Row Level Security
ALTER TABLE public.airdrop_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for airdrop_events - publicly readable
CREATE POLICY "Anyone can view airdrop events"
ON public.airdrop_events FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert airdrop events"
ON public.airdrop_events FOR INSERT
WITH CHECK (true);

-- RLS Policies for admin_wallets - publicly readable for checking admin status
CREATE POLICY "Anyone can view admin wallets"
ON public.admin_wallets FOR SELECT
USING (true);

-- RLS Policies for leaderboard_stats - publicly readable, anyone can upsert
CREATE POLICY "Anyone can view leaderboard stats"
ON public.leaderboard_stats FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert leaderboard stats"
ON public.leaderboard_stats FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update leaderboard stats"
ON public.leaderboard_stats FOR UPDATE
USING (true);

-- Enable realtime for leaderboard_stats
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard_stats;

-- Insert default admin wallet (replace with actual admin address)
INSERT INTO public.admin_wallets (wallet_address, label) 
VALUES ('0x0000000000000000000000000000000000000000', 'Default Admin');