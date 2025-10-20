import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi';
import { config, projectId } from './config/web3';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Ecosystem from "./pages/Ecosystem";
import Integrators from "./pages/Integrators";
import Helpdesk from "./pages/Helpdesk";
import Dashboard from "./pages/Dashboard";
import CommunityForum from "./pages/CommunityForum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#FFD700',
    '--w3m-border-radius-master': '2px',
  },
});

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/ecosystem" element={<Ecosystem />} />
              <Route path="/integrators" element={<Integrators />} />
              <Route path="/helpdesk" element={<Helpdesk />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/community-forum" element={<CommunityForum />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
