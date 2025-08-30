import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Edit, Star, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [currentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : {
      id: "1",
      name: "Anita Sharma",
      role: "worker",
      phone: "+91 98765 43210",
      email: "anita@example.com",
      location: "Mumbai",
      profileImageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      isVerified: true,
      rating: "4.8",
      reviewCount: 132,
      skills: ["Elderly care", "Housekeeping", "First aid"],
      serviceAreas: ["Andheri", "Bandra", "Juhu"],
      hourlyRate: "400",
      verification: ["Aadhaar", "Police check", "Address"]
    };
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account",
    });
    // Navigate to landing page
    window.location.href = "/";
  };

  const getBackPath = () => {
    return currentUser.role === "worker" ? "/worker-dashboard" : "/home";
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href={getBackPath()}>
          <button className="p-2 hover:bg-secondary rounded-lg" data-testid="button-back">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Profile</h1>
        <button className="p-2 hover:bg-secondary rounded-lg" data-testid="button-edit-profile">
          <Edit className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="p-4">
        {/* Profile Info */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img 
              src={currentUser.profileImageUrl} 
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover mx-auto"
              data-testid="img-profile-photo"
            />
            {currentUser.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-sm"></i>
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1" data-testid="text-user-name">
            {currentUser.name}
          </h2>
          <p className="text-muted-foreground text-sm mb-2" data-testid="text-user-role">
            {currentUser.role === "worker" ? "Service Provider" : "Employer"} • {currentUser.location}
          </p>
          {currentUser.role === "worker" && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold" data-testid="text-rating">{currentUser.rating}</span>
              </div>
              <span className="text-muted-foreground" data-testid="text-review-count">
                {currentUser.reviewCount} reviews
              </span>
            </div>
          )}
        </div>

        {/* Personal Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your info</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div>
                <h4 className="font-semibold text-foreground">Phone</h4>
                <p className="text-muted-foreground text-sm" data-testid="text-phone">
                  {currentUser.phone}
                </p>
              </div>
              <button 
                className="text-primary text-sm font-medium hover:underline"
                data-testid="button-update-phone"
              >
                Update
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div>
                <h4 className="font-semibold text-foreground">Email</h4>
                <p className="text-muted-foreground text-sm" data-testid="text-email">
                  {currentUser.email}
                </p>
              </div>
              <button 
                className="text-primary text-sm font-medium hover:underline"
                data-testid="button-update-email"
              >
                Update
              </button>
            </div>

            {currentUser.role === "worker" && (
              <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                <div>
                  <h4 className="font-semibold text-foreground">Service areas</h4>
                  <p className="text-muted-foreground text-sm" data-testid="text-service-areas">
                    {currentUser.serviceAreas?.join(", ")}
                  </p>
                </div>
                <button 
                  className="text-primary text-sm font-medium hover:underline"
                  data-testid="button-manage-areas"
                >
                  Manage
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Professional Info - Only for workers */}
        {currentUser.role === "worker" && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Professional</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                <div>
                  <h4 className="font-semibold text-foreground">Skills</h4>
                  <p className="text-muted-foreground text-sm" data-testid="text-skills">
                    {currentUser.skills?.join(", ")}
                  </p>
                </div>
                <button 
                  className="text-primary text-sm font-medium hover:underline"
                  data-testid="button-edit-skills"
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                <div>
                  <h4 className="font-semibold text-foreground">Verification</h4>
                  <p className="text-muted-foreground text-sm" data-testid="text-verification">
                    {currentUser.verification?.join(" • ")}
                  </p>
                </div>
                <Badge className="bg-primary/10 text-primary text-xs">
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                <div>
                  <h4 className="font-semibold text-foreground">Hourly rate</h4>
                  <p className="text-muted-foreground text-sm" data-testid="text-hourly-rate">
                    ₹{currentUser.hourlyRate} / hr
                  </p>
                </div>
                <button 
                  className="text-primary text-sm font-medium hover:underline"
                  data-testid="button-change-rate"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preferences */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div>
                <h4 className="font-semibold text-foreground">Notifications</h4>
                <p className="text-muted-foreground text-sm">Job alerts, messages</p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                data-testid="switch-notifications"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div>
                <h4 className="font-semibold text-foreground">Languages</h4>
                <p className="text-muted-foreground text-sm">Hindi, Marathi, English</p>
              </div>
              <button 
                className="text-primary text-sm font-medium hover:underline"
                data-testid="button-edit-languages"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
          <div className="space-y-3">
            <button 
              className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all"
              data-testid="button-help-faq"
            >
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Help & FAQs</h4>
                <p className="text-muted-foreground text-sm">Common questions, contact support</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button 
              className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all"
              data-testid="button-privacy-security"
            >
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Privacy & Security</h4>
                <p className="text-muted-foreground text-sm">Permissions, data control</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Log Out */}
        <div className="mb-20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all"
            data-testid="button-logout"
          >
            <div className="text-left">
              <h4 className="font-semibold text-foreground">Log out</h4>
              <p className="text-muted-foreground text-sm">Sign out of your account</p>
            </div>
            <LogOut className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <BottomNavigation userRole={currentUser.role} />
    </div>
  );
}
