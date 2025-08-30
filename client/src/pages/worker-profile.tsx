import { Link, useParams } from "wouter";
import { ArrowLeft, Heart, Star, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/bottom-navigation";
import { mockWorkers } from "@/lib/mock-data";

export default function WorkerProfile() {
  const { id } = useParams();
  const worker = mockWorkers.find(w => w.id === id) || mockWorkers[0];

  return (
    <div className="min-h-screen pb-20">
      {/* Header with Cover Image */}
      <div className="relative">
        <img 
          src={worker.coverImage || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"} 
          alt="Professional work showcase"
          className="w-full h-48 object-cover"
        />
        <Link href="/search">
          <button className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="p-4">
        {/* Worker Info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <img 
              src={worker.profileImage} 
              alt={worker.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white -mt-8"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <i className="fas fa-check text-white text-xs"></i>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-xl font-bold text-foreground">{worker.name}</h1>
              <span className="text-xl font-bold text-foreground">₹{worker.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold">{worker.rating}</span>
                <span className="text-muted-foreground">({worker.reviewCount})</span>
              </div>
              <span className="text-muted-foreground">{worker.experience} yrs exp</span>
              <Badge className="bg-primary/10 text-primary text-xs">ID Verified</Badge>
            </div>
            <div className="flex gap-2 mb-3">
              {worker.skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              {worker.skills.slice(2).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Availability Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-foreground font-medium">Within 5 km • Tue, 18 Jun • 10:00 AM</span>
          </div>
          <button className="text-accent text-sm font-medium hover:underline">Edit</button>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed">{worker.bio}</p>
        </div>

        {/* Quick Facts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Quick facts</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">{worker.avgDuration || "3.2 hrs"}</div>
              <div className="text-muted-foreground text-sm">Avg Duration</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">{worker.completedJobs} jobs</div>
              <div className="text-muted-foreground text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {worker.backgroundCheck ? "Verified" : "Basic"}
              </div>
              <div className="text-muted-foreground text-sm">Background</div>
            </div>
          </div>
        </div>

        {/* Photos */}
        {worker.photos && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Photos</h2>
            <div className="grid grid-cols-3 gap-3">
              {worker.photos.map((photo, index) => (
                <img 
                  key={index}
                  src={photo} 
                  alt={`Work sample ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {worker.reviews && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Reviews ({worker.reviewCount})
            </h2>
            <div className="space-y-4">
              {worker.reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={review.avatar} 
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">{review.author}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Included */}
        <div className="mb-20">
          <h2 className="text-lg font-semibold text-foreground mb-3">What's included</h2>
          <div className="grid grid-cols-2 gap-3">
            <Badge variant="secondary" className="justify-center py-2">Surfaces & dusting</Badge>
            <Badge variant="secondary" className="justify-center py-2">Kitchen appliances</Badge>
            <Badge variant="secondary" className="justify-center py-2">Bathroom deep clean</Badge>
            <Badge variant="secondary" className="justify-center py-2">Floors & mopping</Badge>
          </div>
        </div>

        {/* Book Button */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <Link href="/confirm-booking">
            <Button className="w-full py-4 text-base" data-testid="button-book-worker">
              Book {worker.name} for Tue, 18 Jun
            </Button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
