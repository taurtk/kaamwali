import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Search, UserCircle, Sliders, Calendar, Plus, MapIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkerCard } from "@/components/worker-card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { mockWorkers } from "@/lib/mock-data";

export default function Home() {
  const [currentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : { location: "Mumbai, India" };
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <i className="fas fa-home text-foreground text-lg"></i>
            <h1 className="text-lg font-semibold text-foreground">Home</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search jobs & services"
                className="w-64 pl-10 pr-4 py-2 bg-secondary"
                data-testid="input-search"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Location Header */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">{currentUser.location}</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl font-bold text-foreground mb-2">Find trusted help</h2>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6">
          <Button variant="secondary" size="sm" className="flex items-center gap-2" data-testid="button-filters">
            <Sliders className="w-4 h-4" />
            Filters
          </Button>
          <Button size="sm" data-testid="button-nearby">Nearby</Button>
          <Button variant="secondary" size="sm" data-testid="button-verified">Verified</Button>
        </div>

        {/* Category Browser */}
        <h3 className="text-lg font-semibold text-foreground mb-4">Browse categories</h3>
        <div className="flex gap-3 mb-8 overflow-x-auto">
          <Link href="/search?category=salon">
            <Badge className="bg-accent/20 text-accent-foreground px-4 py-2 text-sm whitespace-nowrap">
              <i className="fas fa-spa mr-2"></i>
              Salon & Spa
            </Badge>
          </Link>
          <Link href="/search?category=care">
            <Badge className="bg-accent/20 text-accent-foreground px-4 py-2 text-sm whitespace-nowrap">
              <i className="fas fa-heart mr-2"></i>
              Caregivers
            </Badge>
          </Link>
          <Link href="/search?category=cleaning">
            <Badge className="bg-accent/20 text-accent-foreground px-4 py-2 text-sm whitespace-nowrap">
              <i className="fas fa-broom mr-2"></i>
              Cleaning
            </Badge>
          </Link>
        </div>

        {/* Recommended Workers */}
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommended for you</h3>
        <div className="space-y-4 mb-8">
          {mockWorkers.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={{
                ...worker,
                isVerified: true,
              }}
              showViewProfile={true}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick actions</h3>
        <div className="grid grid-cols-3 gap-4 mb-20">
          <Link href="/search">
            <button className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-md transition-all">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Book now</p>
            </button>
          </Link>
          <button className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-md transition-all">
            <Plus className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Post a job</p>
          </button>
          <button className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-md transition-all">
            <MapIcon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Nearby map</p>
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
