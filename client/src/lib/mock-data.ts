export const mockWorkers = [
  {
    id: "1",
    name: "Anita Sharma",
    bio: "Specializes in deep cleaning kitchens and bathrooms. Careful with appliances and surfaces, uses eco-friendly products on request.",
    skills: ["Deep clean", "Kitchen & Bath", "Pet friendly"],
    hourlyRate: "22",
    experience: 3,
    rating: "4.8",
    reviewCount: 210,
    isAvailable: true,
    location: "Mumbai",
    distance: "2.5 km",
    responseTime: "fast",
    backgroundCheck: true,
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    coverImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    completedJobs: 120,
    avgDuration: "3.2 hrs",
    reviews: [
      {
        id: "1",
        author: "Rina D.",
        rating: 5.0,
        content: "Fantastic deep clean. Kitchen looks new. On time and very polite.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40"
      },
      {
        id: "2",
        author: "Asha P.",
        rating: 4.8,
        content: "Great with our pets and very thorough. Highly recommend.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40"
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"
    ]
  },
  {
    id: "2",
    name: "Savita More",
    bio: "Experienced in all types of housekeeping with attention to detail. Available for regular and one-time cleaning.",
    skills: ["Deep clean", "Daily chores", "Organizing"],
    hourlyRate: "300",
    experience: 5,
    rating: "4.6",
    reviewCount: 156,
    isAvailable: true,
    location: "Mumbai",
    distance: "3 km",
    responseTime: "medium",
    backgroundCheck: true,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    completedJobs: 98,
    avgDuration: "2.8 hrs"
  },
  {
    id: "3",
    name: "Riya Patel",
    bio: "Professional salon services at your home. Specializing in beauty treatments and grooming.",
    skills: ["Waxing", "Facial", "Hair styling"],
    hourlyRate: "499",
    experience: 4,
    rating: "4.9",
    reviewCount: 89,
    isAvailable: true,
    location: "Mumbai",
    distance: "1.2 km",
    responseTime: "fast",
    backgroundCheck: true,
    profileImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    completedJobs: 76,
    avgDuration: "2.5 hrs"
  }
];

export const mockTransactions = [
  {
    id: "1",
    title: "Cleaning - Baker St",
    details: "18 Jun • 3 hrs • Completed",
    amount: "+₹1,200",
    type: "earning",
    icon: "fas fa-broom",
    iconColor: "text-green-600"
  },
  {
    id: "2",
    title: "Payout to Bank",
    details: "16 Jun • HDFC ••••9210",
    amount: "-₹5,000",
    type: "payout",
    icon: "fas fa-university",
    iconColor: "text-red-600"
  },
  {
    id: "3",
    title: "Elderly Care - Andheri",
    details: "12 Jun • 6 hrs • Completed",
    amount: "+₹2,400",
    type: "earning",
    icon: "fas fa-heart",
    iconColor: "text-green-600"
  },
  {
    id: "4",
    title: "Payout to UPI",
    details: "09 Jun • anita@upi",
    amount: "-₹3,000",
    type: "payout",
    icon: "fas fa-mobile-alt",
    iconColor: "text-red-600"
  }
];

export const mockServices = [
  {
    id: "1",
    name: "Home Cleaning",
    category: "cleaning",
    description: "Regular, deep clean, move-in/out",
    icon: "fas fa-broom"
  },
  {
    id: "2",
    name: "Caregiving",
    category: "care",
    description: "Child, senior, or special needs care",
    icon: "fas fa-heart"
  },
  {
    id: "3",
    name: "Salon & Spa at Home",
    category: "beauty",
    description: "Beauty, grooming, bridal services",
    icon: "fas fa-spa"
  }
];
