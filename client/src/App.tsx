import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Auth from "@/pages/auth";
import Home from "@/pages/home";
import Search from "@/pages/search";
import WorkerProfile from "@/pages/worker-profile";
import ConfirmBooking from "@/pages/confirm-booking";
import BookingConfirmed from "@/pages/booking-confirmed";
import WorkerDashboard from "@/pages/worker-dashboard";
import Wallet from "@/pages/wallet";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/worker/:id" component={WorkerProfile} />
      <Route path="/confirm-booking" component={ConfirmBooking} />
      <Route path="/booking-confirmed" component={BookingConfirmed} />
      <Route path="/worker-dashboard" component={WorkerDashboard} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          <Router />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
