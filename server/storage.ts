import { 
  User, InsertUser,
  Worker, InsertWorker,
  Service,
  Booking, InsertBooking,
  Review, InsertReview,
  Transaction, InsertTransaction,
  Wallet
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  
  // Worker operations
  getWorker(id: string): Promise<Worker | undefined>;
  getWorkerByUserId(userId: string): Promise<Worker | undefined>;
  createWorker(worker: InsertWorker): Promise<Worker>;
  updateWorker(id: string, updates: Partial<Worker>): Promise<Worker>;
  searchWorkers(filters: {
    location?: string;
    skills?: string[];
    minRating?: number;
    maxRate?: number;
    isAvailable?: boolean;
  }): Promise<(Worker & { user: User })[]>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getBookingsByWorker(workerId: string): Promise<Booking[]>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByWorker(workerId: string): Promise<(Review & { reviewer: User })[]>;
  
  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByUser(userId: string): Promise<Transaction[]>;
  
  // Wallet operations
  getWallet(userId: string): Promise<Wallet | undefined>;
  createWallet(userId: string): Promise<Wallet>;
  updateWalletBalance(userId: string, amount: number): Promise<Wallet>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private workers: Map<string, Worker> = new Map();
  private services: Map<string, Service> = new Map();
  private bookings: Map<string, Booking> = new Map();
  private reviews: Map<string, Review> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private wallets: Map<string, Wallet> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize services
    const services = [
      {
        id: randomUUID(),
        name: "Home Cleaning",
        category: "cleaning",
        description: "Professional house cleaning services",
        icon: "fas fa-broom",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Caregiving",
        category: "care",
        description: "Child, elderly, and special needs care",
        icon: "fas fa-heart",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Salon & Spa",
        category: "beauty",
        description: "Beauty and grooming services at home",
        icon: "fas fa-spa",
        createdAt: new Date(),
      },
    ];

    services.forEach(service => this.services.set(service.id, service));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.phone === phone);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    
    // Create wallet for user
    await this.createWallet(id);
    
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getWorker(id: string): Promise<Worker | undefined> {
    return this.workers.get(id);
  }

  async getWorkerByUserId(userId: string): Promise<Worker | undefined> {
    return Array.from(this.workers.values()).find(worker => worker.userId === userId);
  }

  async createWorker(insertWorker: InsertWorker): Promise<Worker> {
    const id = randomUUID();
    const worker: Worker = {
      ...insertWorker,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.workers.set(id, worker);
    return worker;
  }

  async updateWorker(id: string, updates: Partial<Worker>): Promise<Worker> {
    const worker = this.workers.get(id);
    if (!worker) throw new Error("Worker not found");
    
    const updatedWorker = { ...worker, ...updates, updatedAt: new Date() };
    this.workers.set(id, updatedWorker);
    return updatedWorker;
  }

  async searchWorkers(filters: {
    location?: string;
    skills?: string[];
    minRating?: number;
    maxRate?: number;
    isAvailable?: boolean;
  }): Promise<(Worker & { user: User })[]> {
    const workers = Array.from(this.workers.values());
    
    const filtered = workers.filter(worker => {
      if (filters.isAvailable !== undefined && worker.isAvailable !== filters.isAvailable) {
        return false;
      }
      if (filters.minRating && Number(worker.rating) < filters.minRating) {
        return false;
      }
      if (filters.maxRate && Number(worker.hourlyRate) > filters.maxRate) {
        return false;
      }
      if (filters.skills && filters.skills.length > 0) {
        const workerSkills = worker.skills as string[];
        if (!filters.skills.some(skill => workerSkills.includes(skill))) {
          return false;
        }
      }
      return true;
    });

    return filtered.map(worker => {
      const user = this.users.get(worker.userId)!;
      return { ...worker, user };
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.employerId === userId || booking.workerId === userId
    );
  }

  async getBookingsByWorker(workerId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.workerId === workerId
    );
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const booking = this.bookings.get(id);
    if (!booking) throw new Error("Booking not found");
    
    const updatedBooking = { ...booking, ...updates, updatedAt: new Date() };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async getReviewsByWorker(workerId: string): Promise<(Review & { reviewer: User })[]> {
    const reviews = Array.from(this.reviews.values()).filter(
      review => review.revieweeId === workerId
    );
    
    return reviews.map(review => {
      const reviewer = this.users.get(review.reviewerId)!;
      return { ...review, reviewer };
    });
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.userId === userId
    );
  }

  async getWallet(userId: string): Promise<Wallet | undefined> {
    return Array.from(this.wallets.values()).find(wallet => wallet.userId === userId);
  }

  async createWallet(userId: string): Promise<Wallet> {
    const id = randomUUID();
    const wallet: Wallet = {
      id,
      userId,
      balance: "0",
      pendingAmount: "0",
      thisMonthEarnings: "0",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.wallets.set(id, wallet);
    return wallet;
  }

  async updateWalletBalance(userId: string, amount: number): Promise<Wallet> {
    const wallet = await this.getWallet(userId);
    if (!wallet) throw new Error("Wallet not found");
    
    const updatedWallet = {
      ...wallet,
      balance: (Number(wallet.balance) + amount).toString(),
      updatedAt: new Date(),
    };
    this.wallets.set(wallet.id, updatedWallet);
    return updatedWallet;
  }
}

export const storage = new MemStorage();
