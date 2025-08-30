import { Link } from "wouter";
import { Check, Calendar, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockWorkers } from "@/lib/mock-data";

export default function BookingConfirmed() {
  const worker = mockWorkers[0]; // Using first worker as booked

  return (
    <div className="min-h-screen">
      {/* Confirmation Header */}
      <div className="text-center pt-16 pb-8 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">Your cleaning is scheduled with {worker.name}</p>
      </div>

      {/* Booking Summary */}
      <div className="px-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={worker.profileImage} 
              alt={worker.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{worker.name}</h3>
              <p className="text-muted-foreground text-sm">House Cleaning • 3 hrs</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground">₹66</div>
              <div className="text-muted-foreground text-sm">Total</div>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-foreground">Tue, 18 Jun • 10:00 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <p className="font-medium text-foreground">{worker.name} will arrive on time</p>
              <p className="text-muted-foreground text-sm">You'll get a notification when she's on her way</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <p className="font-medium text-foreground">Payment held securely</p>
              <p className="text-muted-foreground text-sm">Released after job completion</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <p className="font-medium text-foreground">Rate your experience</p>
              <p className="text-muted-foreground text-sm">Help others find great service providers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 space-y-3 mb-8">
        <button className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Message {worker.name}</span>
          <i className="fas fa-chevron-right text-muted-foreground ml-auto"></i>
        </button>
        <button className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">View booking details</span>
          <i className="fas fa-chevron-right text-muted-foreground ml-auto"></i>
        </button>
        <button className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all">
          <RotateCcw className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Book again</span>
          <i className="fas fa-chevron-right text-muted-foreground ml-auto"></i>
        </button>
      </div>

      {/* Back to Home */}
      <div className="px-6 pb-8">
        <Link href="/home">
          <Button variant="secondary" className="w-full py-4 text-base" data-testid="button-back-home">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
