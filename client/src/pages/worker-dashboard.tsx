import { useState } from "react";
import { Link } from "wouter";
import { Bell, UserCircle, Wallet, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function WorkerDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : { name: "Anita" };
  });

  const pendingJobs = [
    {
      id: "1",
      title: "House Cleaning",
      location: "Baker Street • 2.5 km away",
      payment: "₹66",
      datetime: "Today, 10:00 AM • 3 hrs",
    }
  ];

  const upcomingJobs = [
    {
      id: "1",
      title: "Elderly Care",
      client: "Mrs. Sharma • Andheri",
      datetime: "Tomorrow, 2:00 PM • 6 hrs",
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Good morning</h1>
            <p className="text-muted-foreground text-sm">{currentUser.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <Link href="/profile">
              <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-primary" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Availability Toggle */}
        <div className="herwork-gradient rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">
                {isOnline ? "You're online" : "You're offline"}
              </h2>
              <p className="text-primary-foreground/80">
                {isOnline ? "Ready to receive bookings" : "Not receiving new bookings"}
              </p>
            </div>
            <Switch
              checked={isOnline}
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-white/20"
              data-testid="switch-availability"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">₹1,200</div>
              <div className="text-primary-foreground/80 text-sm">Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹8,500</div>
              <div className="text-primary-foreground/80 text-sm">This week</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-primary-foreground/80 text-sm">Rating</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/wallet">
            <button className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-md transition-all">
              <Wallet className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">Wallet</p>
              <p className="text-muted-foreground text-sm">₹12,540</p>
            </button>
          </Link>
          <button className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-md transition-all">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="font-semibold text-foreground">Schedule</p>
            <p className="text-muted-foreground text-sm">3 upcoming</p>
          </button>
        </div>

        {/* Pending Jobs */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Pending requests</h3>
          <div className="space-y-3">
            {pendingJobs.map((job) => (
              <div key={job.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{job.title}</h4>
                    <p className="text-muted-foreground text-sm">{job.location}</p>
                  </div>
                  <span className="text-lg font-bold text-foreground">{job.payment}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <i className="fas fa-clock text-muted-foreground text-sm"></i>
                  <span className="text-sm text-muted-foreground">{job.datetime}</span>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    data-testid={`button-decline-${job.id}`}
                  >
                    Decline
                  </Button>
                  <Button 
                    className="flex-1"
                    data-testid={`button-accept-${job.id}`}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Jobs */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming jobs</h3>
          <div className="space-y-3">
            {upcomingJobs.map((job) => (
              <div key={job.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{job.title}</h4>
                    <p className="text-muted-foreground text-sm">{job.client}</p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium">
                    Confirmed
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <i className="fas fa-clock text-muted-foreground text-sm"></i>
                  <span className="text-sm text-muted-foreground">{job.datetime}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <i className="fas fa-map-marker-alt"></i>
                    Directions
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <i className="fas fa-phone"></i>
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Button */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-20">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-destructive" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Safety first</h4>
              <p className="text-muted-foreground text-sm">Tap if you need help or feel unsafe</p>
            </div>
            <Button variant="destructive" size="sm" data-testid="button-sos">
              SOS
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="worker" />
    </div>
  );
}
