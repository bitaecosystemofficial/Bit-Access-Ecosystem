import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Search, Package, Settings, Loader2, Shield, Lock, Users } from "lucide-react";
import { formatUnits } from "viem";
import { useReadContract, useAccount } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import { ItemDetailsModal } from "./ItemDetailsModal";
import { ItemAdminPanel } from "./ItemAdminPanel";
import { AdminWalletPanel } from "./AdminWalletPanel";
import type { Item } from "@/types/Item";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";

export const ExchangeShopTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [dbAdminCheck, setDbAdminCheck] = useState<boolean | null>(null);
  const { isAdmin, isOwner } = useIsAdmin();
  const { address } = useAccount();

  // Check admin status from database as well
  useEffect(() => {
    const checkDbAdmin = async () => {
      if (!address) {
        setDbAdminCheck(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('admin_wallets')
          .select('*')
          .eq('wallet_address', address.toLowerCase())
          .eq('is_active', true)
          .maybeSingle();

        if (error) throw error;
        setDbAdminCheck(!!data);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setDbAdminCheck(false);
      }
    };

    checkDbAdmin();
  }, [address]);

  // Combined admin check (contract OR database)
  const isAuthorizedAdmin = isAdmin || isOwner || dbAdminCheck === true;

  // Get total items from smart contract
  const { data: totalItems, isLoading: loadingTotal, refetch: refetchTotal } = useReadContract({
    address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
    abi: CONTRACT_ABIS.EXCHANGE_SHOP,
    functionName: "getTotalItems",
  });

  // Load all items from smart contract
  useEffect(() => {
    const loadItemsFromContract = async () => {
      if (!totalItems) {
        setLoadingItems(false);
        setItems([]);
        return;
      }

      setLoadingItems(true);
      const itemsArray: Item[] = [];
      const total = Number(totalItems);

      for (let i = 0; i < total; i++) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/read-contract`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
              abi: CONTRACT_ABIS.EXCHANGE_SHOP,
              functionName: 'getItem',
              args: [BigInt(i)],
            }),
          });

          if (response.ok) {
            const itemData = await response.json();
            if (itemData && itemData.data) {
              const [id, name, description, price, merchant, stock, active, category, imageUrl] = itemData.data;
              itemsArray.push({
                id: Number(id),
                name,
                description,
                price,
                merchant,
                stock: Number(stock),
                active,
                category,
                imageUrl,
              });
            }
          }
        } catch (error) {
          console.error(`Error loading item ${i}:`, error);
        }
      }

      setItems(itemsArray);
      setLoadingItems(false);
    };

    loadItemsFromContract();
  }, [totalItems]);

  // Refetch items periodically when admin panel is shown
  useEffect(() => {
    if (showAdmin && isAuthorizedAdmin) {
      const interval = setInterval(() => {
        refetchTotal();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showAdmin, isAuthorizedAdmin, refetchTotal]);

  const filteredItems = items.filter(
    (item) =>
      item.active &&
      item.stock > 0 &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Exchange Shop</h2>
          <p className="text-muted-foreground">
            Buy items using your BIT tokens
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAuthorizedAdmin && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAdmin(!showAdmin)}
              title="Admin Panel"
              className="relative"
            >
              <Settings className="h-5 w-5" />
              <Shield className="h-3 w-3 absolute -top-1 -right-1 text-primary" />
            </Button>
          )}
          <ShoppingBag className="h-8 w-8 text-primary" />
        </div>
      </div>

      {/* Admin Panel - Protected */}
      {showAdmin && (
        isAuthorizedAdmin ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Admin Mode Active</p>
                <p className="text-xs text-muted-foreground">
                  {isOwner ? 'Contract Owner' : 'Authorized Admin'}
                </p>
              </div>
            </div>
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="items" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Items
                </TabsTrigger>
                <TabsTrigger value="admins" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Admins
                </TabsTrigger>
              </TabsList>
              <TabsContent value="items" className="mt-4">
                <ItemAdminPanel existingItems={items} />
              </TabsContent>
              <TabsContent value="admins" className="mt-4">
                <AdminWalletPanel />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Lock className="h-12 w-12 text-destructive mb-4" />
              <p className="font-medium text-destructive">Access Denied</p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Your wallet address is not authorized to access the admin panel.
              </p>
            </CardContent>
          </Card>
        )
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingItems || loadingTotal ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground text-center">
                Loading items from blockchain...
              </p>
            </CardContent>
          </Card>
        ) : filteredItems.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? "No items found matching your search"
                  : "No items available at the moment"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                {item.imageUrl && item.imageUrl !== '/placeholder.svg' ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <Package className={`h-12 w-12 text-muted-foreground ${item.imageUrl && item.imageUrl !== '/placeholder.svg' ? 'hidden' : ''}`} />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {formatUnits(item.price, 9)} BIT
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {item.stock}
                    </p>
                  </div>
                  <Button>Exchange Now</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};
