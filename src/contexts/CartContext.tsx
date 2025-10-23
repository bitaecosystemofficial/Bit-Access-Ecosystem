import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  usdPrice: string;
  type: 'merchandise';
  size?: string;
  color?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalBIT: number;
  totalUSD: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems((prev) => {
      // Check if item with same name, size, and color already exists
      const existingIndex = prev.findIndex(
        (i) => i.name === item.name && i.size === item.size && i.color === item.color
      );

      if (existingIndex > -1) {
        // Update quantity if exists
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        // Add new item
        return [...prev, { ...item, id: `${item.name}-${Date.now()}`, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalBIT = items.reduce((total, item) => total + item.priceValue * item.quantity, 0);
  const totalUSD = items.reduce((total, item) => {
    const usdValue = parseFloat(item.usdPrice.replace('$', ''));
    return total + usdValue * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalBIT,
        totalUSD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
