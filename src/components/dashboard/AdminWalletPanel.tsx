import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Plus, 
  Trash2, 
  Loader2, 
  UserPlus, 
  Users,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsContractOwner } from "@/hooks/useIsContractOwner";

interface AdminWallet {
  id: string;
  wallet_address: string;
  label: string | null;
  is_active: boolean;
  created_at: string;
}

export const AdminWalletPanel = () => {
  const [wallets, setWallets] = useState<AdminWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const { isOwner } = useIsContractOwner();

  // Fetch admin wallets
  const fetchWallets = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_wallets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWallets(data || []);
    } catch (error) {
      console.error('Error fetching admin wallets:', error);
      toast.error('Failed to load admin wallets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  // Add new admin wallet
  const handleAddWallet = async () => {
    if (!newAddress.trim()) {
      toast.error('Please enter a wallet address');
      return;
    }

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(newAddress.trim())) {
      toast.error('Invalid wallet address format');
      return;
    }

    setAdding(true);
    try {
      const { error } = await supabase
        .from('admin_wallets')
        .insert({
          wallet_address: newAddress.toLowerCase().trim(),
          label: newLabel.trim() || null,
          is_active: true
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('This wallet address is already in the whitelist');
        } else {
          throw error;
        }
        return;
      }

      toast.success('Admin wallet added successfully');
      setNewAddress("");
      setNewLabel("");
      fetchWallets();
    } catch (error) {
      console.error('Error adding admin wallet:', error);
      toast.error('Failed to add admin wallet');
    } finally {
      setAdding(false);
    }
  };

  // Toggle wallet active status
  const handleToggleActive = async (wallet: AdminWallet) => {
    try {
      const { error } = await supabase
        .from('admin_wallets')
        .update({ is_active: !wallet.is_active })
        .eq('id', wallet.id);

      if (error) throw error;
      toast.success(`Admin wallet ${wallet.is_active ? 'deactivated' : 'activated'}`);
      fetchWallets();
    } catch (error) {
      console.error('Error toggling wallet status:', error);
      toast.error('Failed to update wallet status');
    }
  };

  // Remove wallet from whitelist
  const handleRemoveWallet = async (wallet: AdminWallet) => {
    if (!confirm(`Are you sure you want to remove ${wallet.label || wallet.wallet_address}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_wallets')
        .delete()
        .eq('id', wallet.id);

      if (error) throw error;
      toast.success('Admin wallet removed');
      fetchWallets();
    } catch (error) {
      console.error('Error removing wallet:', error);
      toast.error('Failed to remove wallet');
    }
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isOwner) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <p className="font-medium text-destructive">Owner Access Required</p>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Only the contract owner can manage admin wallets.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>Admin Wallet Management</CardTitle>
        </div>
        <CardDescription>
          Add or remove wallet addresses from the admin whitelist
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Admin Form */}
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2 text-sm font-medium">
            <UserPlus className="h-4 w-4" />
            Add New Admin
          </div>
          <div className="grid gap-3">
            <Input
              placeholder="Wallet Address (0x...)"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <Input
              placeholder="Label (optional)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
            <Button 
              onClick={handleAddWallet} 
              disabled={adding || !newAddress.trim()}
              className="w-full"
            >
              {adding ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin Wallet
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Admin Wallets List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Whitelisted Admins</h4>
            <Badge variant="outline">{wallets.length} total</Badge>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : wallets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No admin wallets added yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    wallet.is_active 
                      ? 'bg-card hover:bg-muted/50' 
                      : 'bg-muted/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${wallet.is_active ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                    <div>
                      <p className="font-mono text-sm">{formatAddress(wallet.wallet_address)}</p>
                      {wallet.label && (
                        <p className="text-xs text-muted-foreground">{wallet.label}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(wallet)}
                      title={wallet.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {wallet.is_active ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveWallet(wallet)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
