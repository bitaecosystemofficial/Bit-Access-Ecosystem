import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Plus, Loader2, Upload, Image as ImageIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { parseUnits } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Item } from '@/types/Item';

interface ItemAdminPanelProps {
  existingItems: Item[];
}

export function ItemAdminPanel({ existingItems }: ItemAdminPanelProps) {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    merchant: '0x1234567890123456789012345678901234567890',
    stock: '',
    category: 'Electronics',
    imageUrl: '',
  });

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Gaming', 'Other'];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);

      // Upload to NFT.storage via edge function
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const { data, error } = await supabase.functions.invoke('upload-to-nft-storage', {
        body: formDataUpload,
      });

      if (error) throw error;

      if (data?.url) {
        setFormData({ ...formData, imageUrl: data.url });
        toast({
          title: "Image Uploaded",
          description: "Image stored on IPFS via NFT.storage",
        });
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: error?.message || "Failed to upload image to NFT.storage",
        variant: "destructive",
      });
      setImagePreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, imageUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!formData.imageUrl) {
      toast({
        title: "Missing Image",
        description: "Please upload an image for the item",
        variant: "destructive",
      });
      return;
    }

    try {
      const priceInSmallestUnit = parseUnits(formData.price, 9); // BIT has 9 decimals

      await writeContract({
        address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
        abi: CONTRACT_ABIS.EXCHANGE_SHOP,
        functionName: "listItem",
        args: [
          formData.name,
          formData.description,
          priceInSmallestUnit,
          formData.merchant as `0x${string}`,
          BigInt(formData.stock),
          formData.category,
          formData.imageUrl,
        ],
      } as any);

      toast({
        title: "Item Listed",
        description: `${formData.name} is being added to the blockchain`,
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        merchant: '0x1234567890123456789012345678901234567890',
        stock: '',
        category: 'Electronics',
        imageUrl: '',
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error("Error listing item:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to list item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Add New Item to Blockchain</CardTitle>
          </div>
          <CardDescription>
            List items on the Exchange Shop smart contract. Images are stored on IPFS via NFT.storage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label>Item Image *</Label>
            <div className="flex items-start gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {isUploading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Click to upload</span>
                    </>
                  )}
                </div>
              )}
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading to IPFS...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Images are stored permanently on IPFS via NFT.storage
                </p>
                {formData.imageUrl && (
                  <p className="text-xs text-green-600 break-all">
                    IPFS URL: {formData.imageUrl}
                  </p>
                )}
              </div>
            </div>
          </div>

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

          <Button onClick={handleSubmit} className="w-full" disabled={isConfirming || isUploading}>
            {isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Listing on Blockchain...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Item to Blockchain
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {existingItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Items on Blockchain ({existingItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {existingItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(Number(item.price) / 1e9).toLocaleString()} BIT · Stock: {item.stock} · {item.category}
                      </p>
                    </div>
                  </div>
                  <Badge variant={item.active ? "default" : "secondary"}>
                    {item.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
