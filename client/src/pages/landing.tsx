import { Link } from "wouter";
import { Users, Home, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="p-6 min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Users className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">HerWork</h1>
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            Beta
          </span>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Empowering Women Through Work
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Connect with trusted women professionals for all your service needs, or find meaningful work opportunities.
        </p>
      </div>

      {/* Role Selection */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Choose how you want to use HerWork
        </h3>
        
        <Link href="/auth?role=employer">
          <button 
            className="w-full p-4 bg-card border border-border rounded-xl text-left hover:shadow-md transition-all"
            data-testid="button-employer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Home className="text-accent w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Employer / Household</h4>
                <p className="text-muted-foreground text-sm">
                  Find and book trusted women workers for your needs
                </p>
              </div>
              <i className="fas fa-chevron-right text-muted-foreground"></i>
            </div>
          </button>
        </Link>

        <Link href="/auth?role=worker">
          <button 
            className="w-full p-4 bg-card border border-border rounded-xl text-left hover:shadow-md transition-all"
            data-testid="button-worker"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Briefcase className="text-primary w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Worker / Service Provider</h4>
                <p className="text-muted-foreground text-sm">
                  Get jobs, manage bookings, and track earnings
                </p>
              </div>
              <i className="fas fa-chevron-right text-muted-foreground"></i>
            </div>
          </button>
        </Link>
      </div>

      {/* Quick Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick preferences</h3>
        <div className="flex gap-3 mb-4">
          <Button variant="default" size="sm" data-testid="button-english">English</Button>
          <Button variant="secondary" size="sm" data-testid="button-hindi">हिंदी</Button>
          <Button variant="secondary" size="sm" data-testid="button-bengali">বাংলা</Button>
        </div>
        <p className="text-muted-foreground text-xs">You can change this later in Settings.</p>
      </div>

      {/* Get Started Button */}
      <div className="mt-auto pb-8">
        <Link href="/auth">
          <Button className="w-full py-4 text-base" data-testid="button-get-started">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
