
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import BrowseTools from "./pages/BrowseTools";
import ListSubscription from "./pages/ListSubscription";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ApiDocs from "./pages/ApiDocs";
import HelpCenter from "./pages/HelpCenter";
import Status from "./pages/Status";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import GDPR from "./pages/GDPR";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/browse-tools" element={<BrowseTools />} />
          <Route path="/list-subscription" element={<ListSubscription />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/status" element={<Status />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/gdpr" element={<GDPR />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
