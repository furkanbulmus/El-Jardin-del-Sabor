import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/home";
import MenuPage from "@/pages/menu";
import ReservationsPage from "@/pages/reservations";
import AboutPage from "@/pages/about";
import GalleryPage from "@/pages/gallery";
import ContactPage from "@/pages/contact";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/reservations" component={ReservationsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="dark min-h-screen bg-dark-900 text-gray-100">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
