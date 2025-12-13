-- Add policies for admin_wallets table to allow management
-- First drop the restrictive policies if they exist
DROP POLICY IF EXISTS "Anyone can view admin wallets" ON public.admin_wallets;

-- Create new policies
CREATE POLICY "Anyone can view admin wallets" 
ON public.admin_wallets 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert admin wallets" 
ON public.admin_wallets 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update admin wallets" 
ON public.admin_wallets 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete admin wallets" 
ON public.admin_wallets 
FOR DELETE 
USING (true);

-- Add unique constraint on wallet_address if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'admin_wallets_wallet_address_key'
    ) THEN
        ALTER TABLE public.admin_wallets ADD CONSTRAINT admin_wallets_wallet_address_key UNIQUE (wallet_address);
    END IF;
END $$;