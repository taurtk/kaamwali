import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/bottom-navigation";
import { mockWorkers } from "@/lib/mock-data";

export default function ConfirmBooking() {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const worker = mockWorkers[0]; // Using first worker as selected

  const durations = [2, 3, 4, 5, 6, "Full day"];
  const addOns = [
    { name: "Inside fridge", price: 8 },
    { name: "Inside oven", price: 10 },
    { name: "Balcony", price: 8 },
    { name: "Eco products", price: 4 },
  ];

  const toggleAddOn = (addOn: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) 
        ? prev.filter(a => a !== addOn)
        : [...prev, addOn]
    );
  };

  const calculateTotal = () => {
    const baseAmount = selectedDuration * Number(worker.hourlyRate);
    const addOnTotal = selectedAddOns.reduce((total, addOnName) => {
      const addOn = addOns.find(a => a.name === addOnName);
      return total + (addOn?.price || 0);
    }, 0);
    return baseAmount + addOnTotal;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/worker/1">
          <button className="p-2 hover:bg-secondary rounded-lg" data-testid="button-back">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Confirm Booking</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4">
        {/* Worker Summary */}
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={worker.profileImage} 
            alt={worker.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{worker.name}</h3>
            <p className="text-muted-foreground text-sm">House Cleaning • {worker.experience} yrs exp</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-foreground">₹{worker.hourlyRate}/hr</span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">Tue, 18 Jun</h4>
              <p className="text-muted-foreground text-sm">10:00 AM • Within 5 km</p>
            </div>
            <button className="text-accent text-sm font-medium hover:underline" data-testid="button-change-time">
              Change
            </button>
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Duration</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {durations.slice(0, 3).map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(Number(duration))}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedDuration === duration
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:border-primary"
                }`}
                data-testid={`duration-${duration}`}
              >
                <div className="font-semibold">{duration} hrs</div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {durations.slice(3).map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(typeof duration === "string" ? 8 : duration)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  (typeof duration === "string" ? 8 : duration) === selectedDuration
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:border-primary"
                }`}
                data-testid={`duration-${typeof duration === "string" ? "full-day" : duration}`}
              >
                <div className="font-semibold">{duration === "Full day" ? "Full day" : `${duration} hrs`}</div>
              </button>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">Average for similar jobs: 3.2 hrs</p>
        </div>

        {/* Add-ons */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add-ons</h3>
          <div className="grid grid-cols-2 gap-3">
            {addOns.slice(0, 3).map((addOn) => (
              <button
                key={addOn.name}
                onClick={() => toggleAddOn(addOn.name)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  selectedAddOns.includes(addOn.name)
                    ? "border-primary bg-primary/5"
                    : "border border-border hover:border-primary"
                }`}
                data-testid={`addon-${addOn.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="font-medium text-foreground">{addOn.name}</div>
                <div className="text-muted-foreground text-sm">+₹{addOn.price}</div>
              </button>
            ))}
          </div>
          <button
            onClick={() => toggleAddOn(addOns[3].name)}
            className={`mt-3 p-3 rounded-lg text-left w-full transition-colors ${
              selectedAddOns.includes(addOns[3].name)
                ? "border-primary bg-primary/5"
                : "border border-border hover:border-primary"
            }`}
            data-testid="addon-eco-products"
          >
            <div className="font-medium text-foreground">{addOns[3].name}</div>
            <div className="text-muted-foreground text-sm">+₹{addOns[3].price}</div>
          </button>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Address</h3>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">Home • 221B Baker Street</h4>
                <p className="text-muted-foreground text-sm">Apt 4C, Mumbai</p>
              </div>
              <button className="text-accent text-sm font-medium hover:underline" data-testid="button-edit-address">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment</h3>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fab fa-cc-visa text-blue-600 text-xl"></i>
                <span className="font-medium text-foreground">Visa •••• 4242</span>
              </div>
              <button className="text-accent text-sm font-medium hover:underline" data-testid="button-change-payment">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-secondary rounded-xl p-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hourly rate</span>
              <span className="font-medium text-foreground">₹{worker.hourlyRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium text-foreground">{selectedDuration} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons</span>
              <span className="font-medium text-foreground">
                ₹{selectedAddOns.reduce((total, addOnName) => {
                  const addOn = addOns.find(a => a.name === addOnName);
                  return total + (addOn?.price || 0);
                }, 0)}
              </span>
            </div>
            <hr className="border-border my-3" />
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-foreground">₹{calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mb-20">
          <Link href="/booking-confirmed">
            <Button className="w-full py-4 text-base" data-testid="button-confirm-pay">
              Confirm and Pay ₹{calculateTotal()}
            </Button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
