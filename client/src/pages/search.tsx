import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkerCard } from "@/components/worker-card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { mockWorkers } from "@/lib/mock-data";

export default function Search() {
  const [selectedFilters, setSelectedFilters] = useState(["Deep clean"]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Link href="/home">
            <button className="p-2 hover:bg-secondary rounded-lg" data-testid="button-back">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Home Cleaning</h1>
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium ml-auto">
            Beta
          </span>
        </div>
        <p className="text-muted-foreground text-sm px-4 pb-4">
          Filter and view trusted workers available near you.
        </p>
      </div>

      <div className="p-4">
        {/* Location and Time */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-foreground">Downtown, Mumbai</span>
            <button className="text-accent text-sm font-medium hover:underline" data-testid="button-change-location">
              Change
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Date</label>
              <span className="text-foreground font-medium">Tue, 18 Jun</span>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Time</label>
              <span className="text-foreground font-medium">10:00 AM</span>
            </div>
          </div>
        </div>

        {/* Service Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {["Deep clean", "Move-in/out", "3-4 hrs", "2 BHK"].map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                selectedFilters.includes(filter)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
              data-testid={`filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="text-primary text-sm font-medium mb-6 hover:underline flex items-center gap-2">
          <MoreHorizontal className="w-4 h-4" />
          More filters
        </button>

        {/* Map View */}
        <div className="bg-secondary rounded-xl h-48 flex items-center justify-center mb-6 relative">
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23f0f9ff'/><path d='M0 150 Q100 100 200 150 T400 150' stroke='%2306b6d4' stroke-width='2' fill='none'/><circle cx='150' cy='120' r='4' fill='%2314b8a6'/><circle cx='250' cy='180' r='4' fill='%2314b8a6'/><circle cx='200' cy='150' r='4' fill='%2314b8a6'/></svg>")`,
              backgroundSize: "cover"
            }}></div>
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
              Showing available workers within 5 km
            </div>
          </div>
        </div>

        {/* Available Workers */}
        <h3 className="text-lg font-semibold text-foreground mb-4">Available today</h3>
        <div className="space-y-4 mb-20">
          {mockWorkers.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={{
                ...worker,
                isVerified: true,
                backgroundCheck: worker.id === "2",
                availability: worker.id === "1" ? "Same-day" : "Morning",
              }}
              showViewProfile={true}
            />
          ))}
        </div>

        {/* Continue to Booking */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <Link href="/confirm-booking">
            <Button className="w-full py-4 text-base" data-testid="button-continue-booking">
              Continue to booking
            </Button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
