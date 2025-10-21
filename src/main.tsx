import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BITBalanceProvider } from "./contexts/BITBalanceContext";
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")!).render(
  <BITBalanceProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </BITBalanceProvider>
);
