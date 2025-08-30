import { Link } from "wouter";
import { Star, MapPin, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface WorkerCardProps {
  worker: {
    id: string;
    name: string;
    profileImage: string;
    rating: string;
    reviewCount: number;
    hourlyRate: string;
    distance: string;
    skills: string[];
    experience: number;
    backgroundCheck?: boolean;
    isVerified?: boolean;
    availability?: string;
  };
  showViewProfile?: boolean;
}

export function WorkerCard({ worker, showViewProfile = false }: WorkerCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={worker.profileImage} 
            alt={worker.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {worker.isVerified && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <i className="fas fa-check text-white text-xs"></i>
            </div>
          )}
          {worker.backgroundCheck && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
              <Shield className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-foreground">{worker.name}</h4>
            <span className="text-lg font-bold text-foreground">₹{worker.hourlyRate}/hr</span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{worker.rating}</span>
              <span className="text-muted-foreground text-sm">({worker.reviewCount})</span>
            </div>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">{worker.experience} yrs exp</span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">{worker.distance}</span>
          </div>

          <div className="flex gap-2 mb-3">
            {worker.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            {worker.availability && (
              <Badge className="bg-primary/10 text-primary text-sm">
                {worker.availability}
              </Badge>
            )}
            
            {showViewProfile && (
              <Link href={`/worker/${worker.id}`}>
                <Button size="sm" data-testid="button-view-profile">
                  View Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
