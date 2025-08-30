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
  },
  {
    id: "4",
    name: "Priya Singh",
    bio: "Expert in childcare and early education. Patient and nurturing with children of all ages.",
    skills: ["Childcare", "Tutoring", "Play activities"],
    hourlyRate: "350",
    experience: 6,
    rating: "4.7",
    reviewCount: 134,
    isAvailable: false,
    location: "Delhi",
    distance: "4.1 km",
    responseTime: "medium",
    backgroundCheck: true,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    completedJobs: 95,
    avgDuration: "4 hrs"
  },
  {
    id: "5",
    name: "Kavita Rao",
    bio: "Skilled in elderly care and companionship. Provides medical assistance and emotional support.",
    skills: ["Elderly care", "Medical assistance", "Companionship"],
    hourlyRate: "400",
    experience: 8,
    rating: "4.9",
    reviewCount: 178,
    isAvailable: true,
    location: "Bangalore",
    distance: "2.8 km",
    responseTime: "fast",
    backgroundCheck: true,
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    completedJobs: 142,
    avgDuration: "5 hrs"
  },
  {
    id: "6",
    name: "Meera Joshi",
    bio: "Professional cook specializing in Indian cuisine. Catering for events and home meals.",
    skills: ["Cooking", "Catering", "Meal prep"],
    hourlyRate: "600",
    experience: 7,
    rating: "4.8",
    reviewCount: 112,
    isAvailable: true,
    location: "Pune",
    distance: "3.5 km",
    responseTime: "medium",
    backgroundCheck: true,
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    completedJobs: 88,
    avgDuration: "3 hrs"
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
  },
  {
    id: "5",
    title: "Salon Service - Bandra",
    details: "05 Jun • 2 hrs • Completed",
    amount: "+₹800",
    type: "earning",
    icon: "fas fa-spa",
    iconColor: "text-green-600"
  },
  {
    id: "6",
    title: "Childcare - Lower Parel",
    details: "02 Jun • 4 hrs • Completed",
    amount: "+₹1,400",
    type: "earning",
    icon: "fas fa-child",
    iconColor: "text-green-600"
  },
  {
    id: "7",
    title: "Payout to Bank",
    details: "30 May • SBI ••••4567",
    amount: "-₹4,500",
    type: "payout",
    icon: "fas fa-university",
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
  },
  {
    id: "4",
    name: "Tutoring & Education",
    category: "education",
    description: "Academic tutoring, skill development",
    icon: "fas fa-graduation-cap"
  },
  {
    id: "5",
    name: "Event Catering",
    category: "food",
    description: "Home-cooked meals, party catering",
    icon: "fas fa-utensils"
  },
  {
    id: "6",
    name: "Pet Care",
    category: "pets",
    description: "Pet sitting, walking, grooming",
    icon: "fas fa-paw"
  }
];
