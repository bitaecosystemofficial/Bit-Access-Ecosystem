import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search, Package, Settings } from "lucide-react";
import { formatUnits } from "viem";
import { ItemDetailsModal } from "./ItemDetailsModal";
import { ItemAdminPanel } from "./ItemAdminPanel";
import type { Item } from "@/types/Item";
import { useIsContractOwner } from "@/hooks/useIsContractOwner";

export const ExchangeShopTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const { isOwner } = useIsContractOwner();

  // Load items from localStorage
  useEffect(() => {
    const loadItems = () => {
      const storedItems = localStorage.getItem("exchangeShopItems");
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          // Convert price strings back to BigInt
          const itemsWithBigInt = parsedItems.map((item: any) => ({
            ...item,
            price: BigInt(item.price),
          }));
          setItems(itemsWithBigInt);
        } catch (error) {
          console.error("Error loading items:", error);
          setItems([]);
        }
      } else {
        // Initialize with default items
        const defaultItems: Item[] = [
          {
            id: 0,
            name: "Premium Headphones",
            description: "High-quality wireless headphones with noise cancellation",
            price: BigInt(500000000000), // 500 BIT
            merchant: "0x1234567890123456789012345678901234567890",
            stock: 25,
            active: true,
            category: "Electronics",
            imageUrl: "/placeholder.svg",
          },
          {
            id: 1,
            name: "Smart Watch",
            description: "Fitness tracking smartwatch with heart rate monitor",
            price: BigInt(800000000000), // 800 BIT
            merchant: "0x1234567890123456789012345678901234567890",
            stock: 15,
            active: true,
            category: "Electronics",
            imageUrl: "/placeholder.svg",
          },
          {
            id: 2,
            name: "Wireless Keyboard",
            description: "Mechanical keyboard with RGB backlight",
            price: BigInt(300000000000), // 300 BIT
            merchant: "0x1234567890123456789012345678901234567890",
            stock: 40,
            active: true,
            category: "Electronics",
            imageUrl: "/placeholder.svg",
          },
        ];
        saveItems(defaultItems);
        setItems(defaultItems);
      }
    };

    loadItems();
  }, []);

  const saveItems = (itemsToSave: Item[]) => {
    // Convert BigInt to string for JSON serialization
    const itemsToStore = itemsToSave.map((item) => ({
      ...item,
      price: item.price.toString(),
    }));
    localStorage.setItem("exchangeShopItems", JSON.stringify(itemsToStore));
  };

  const addItem = (newItem: Omit<Item, "id">) => {
    const maxId = items.length > 0 ? Math.max(...items.map((i) => i.id)) : -1;
    const itemWithId = { ...newItem, id: maxId + 1 };
    const updatedItems = [...items, itemWithId];
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const updateItem = (updatedItem: Item) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const deleteItem = (itemId: number) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

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
          {isOwner && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAdmin(!showAdmin)}
              title="Manage Items"
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
          <ShoppingBag className="h-8 w-8 text-primary" />
        </div>
      </div>

      {showAdmin && (
        <ItemAdminPanel
          onAddItem={addItem}
          onUpdateItem={updateItem}
          onDeleteItem={deleteItem}
          existingItems={items}
        />
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
