import { Link, useLocation } from "wouter";
import { Home, Search, Wallet, User } from "lucide-react";

interface BottomNavigationProps {
  userRole?: string;
}

export function BottomNavigation({ userRole }: BottomNavigationProps) {
  const [location] = useLocation();

  const getNavItems = () => {
    if (userRole === "worker") {
      return [
        { path: "/worker-dashboard", icon: Home, label: "Home" },
        { path: "/search", icon: Search, label: "Jobs" },
        { path: "/wallet", icon: Wallet, label: "Wallet" },
        { path: "/profile", icon: User, label: "Profile" },
      ];
    }
    
    return [
      { path: "/home", icon: Home, label: "Home" },
      { path: "/search", icon: Search, label: "Search" },
      { path: "/wallet", icon: Wallet, label: "Wallet" },
      { path: "/profile", icon: User, label: "Profile" },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-border">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          return (
            <Link key={path} href={path}>
              <button 
                className={`p-4 text-center ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-${label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs font-medium">{label}</p>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
