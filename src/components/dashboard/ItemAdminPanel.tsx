import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Shield, Plus, Trash2, Edit } from 'lucide-react';
import { parseUnits } from 'viem';
import type { Item } from '@/types/Item';

interface ItemAdminPanelProps {
  onAddItem: (item: Omit<Item, 'id'>) => void;
  onUpdateItem: (item: Item) => void;
  onDeleteItem: (itemId: number) => void;
  existingItems: Item[];
}

export function ItemAdminPanel({ onAddItem, onUpdateItem, onDeleteItem, existingItems }: ItemAdminPanelProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    merchant: '0x1234567890123456789012345678901234567890',
    stock: '',
    category: 'Electronics',
    imageUrl: '/placeholder.svg',
  });

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Gaming', 'Other'];

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const priceInSmallestUnit = parseUnits(formData.price, 9); // BIT has 9 decimals

      if (isEditing && editingItem) {
        onUpdateItem({
          ...editingItem,
          name: formData.name,
          description: formData.description,
          price: priceInSmallestUnit,
          merchant: formData.merchant as `0x${string}`,
          stock: parseInt(formData.stock),
          category: formData.category,
          imageUrl: formData.imageUrl,
        });
        toast({
          title: "Item Updated",
          description: `${formData.name} has been updated successfully`,
        });
        setIsEditing(false);
        setEditingItem(null);
      } else {
        onAddItem({
          name: formData.name,
          description: formData.description,
          price: priceInSmallestUnit,
          merchant: formData.merchant as `0x${string}`,
          stock: parseInt(formData.stock),
          active: true,
          category: formData.category,
          imageUrl: formData.imageUrl,
        });
        toast({
          title: "Item Added",
          description: `${formData.name} has been added to the shop`,
        });
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        merchant: '0x1234567890123456789012345678901234567890',
        stock: '',
        category: 'Electronics',
        imageUrl: '/placeholder.svg',
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to save item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Item) => {
    setIsEditing(true);
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: (Number(item.price) / 1e9).toString(),
      merchant: item.merchant,
      stock: item.stock.toString(),
      category: item.category,
      imageUrl: item.imageUrl,
    });
  };

  const handleDelete = (itemId: number, itemName: string) => {
    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
      onDeleteItem(itemId);
      toast({
        title: "Item Deleted",
        description: `${itemName} has been removed from the shop`,
      });
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      merchant: '0x1234567890123456789012345678901234567890',
      stock: '',
      category: 'Electronics',
      imageUrl: '/placeholder.svg',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>{isEditing ? 'Edit Item' : 'Add New Item'}</CardTitle>
          </div>
          <CardDescription>
            Manage items in the Exchange Shop. Items are stored locally and can be exchanged via smart contract.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Premium Headphones"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (BIT tokens) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                placeholder="e.g., 25"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Item description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="merchant">Merchant Address</Label>
              <Input
                id="merchant"
                placeholder="0x..."
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            {isEditing && (
              <Button variant="outline" onClick={cancelEdit} className="flex-1">
                Cancel
              </Button>
            )}
            <Button onClick={handleSubmit} className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              {isEditing ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {existingItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Existing Items ({existingItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {existingItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(Number(item.price) / 1e9).toLocaleString()} BIT · Stock: {item.stock} · {item.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
