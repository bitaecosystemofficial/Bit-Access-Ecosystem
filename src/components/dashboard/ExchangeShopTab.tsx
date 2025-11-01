import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search, Package } from "lucide-react";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import { formatUnits } from "viem";
import { ItemDetailsModal } from "./ItemDetailsModal";
import type { Item } from "@/types/Item";

export const ExchangeShopTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const { data: totalItems } = useReadContract({
    address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
    abi: CONTRACT_ABIS.EXCHANGE_SHOP,
    functionName: "getTotalItems",
  });

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      if (!totalItems) return;

      const itemsArray: Item[] = [];
      const count = Number(totalItems);

      for (let i = 0; i < count; i++) {
        try {
          const itemData = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/get_item`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ item_id: i }),
            }
          );
          
          // Fallback to mock data for demo
          const mockItem: Item = {
            id: i,
            name: `Product ${i + 1}`,
            description: "High-quality product available for exchange",
            price: BigInt(1000000000000), // 1000 BIT
            merchant: "0x1234567890123456789012345678901234567890",
            stock: 50,
            active: true,
            category: "Electronics",
            imageUrl: "/placeholder.svg",
          };
          
          itemsArray.push(mockItem);
        } catch (error) {
          console.error(`Error fetching item ${i}:`, error);
        }
      }

      setItems(itemsArray);
    };

    fetchItems();
  }, [totalItems]);

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
        <ShoppingBag className="h-8 w-8 text-primary" />
      </div>

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
        {filteredItems.length === 0 ? (
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
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
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
