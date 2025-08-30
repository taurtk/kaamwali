import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertWorkerSchema, insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server | void> {
  // User routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { phone } = req.body;
      if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
      }
      
      const user = await storage.getUserByPhone(phone);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Login failed", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Worker routes
  app.post("/api/workers", async (req, res) => {
    try {
      const workerData = insertWorkerSchema.parse(req.body);
      const worker = await storage.createWorker(workerData);
      res.json(worker);
    } catch (error) {
      res.status(400).json({ message: "Invalid worker data", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/workers/search", async (req, res) => {
    try {
      const { location, skills, minRating, maxRate, isAvailable } = req.query;
      
      const filters: any = {};
      if (location) filters.location = location as string;
      if (skills) filters.skills = (skills as string).split(',');
      if (minRating) filters.minRating = Number(minRating);
      if (maxRate) filters.maxRate = Number(maxRate);
      if (isAvailable !== undefined) filters.isAvailable = isAvailable === 'true';

      const workers = await storage.searchWorkers(filters);
      res.json(workers);
    } catch (error) {
      res.status(500).json({ message: "Failed to search workers", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/workers/:id", async (req, res) => {
    try {
      const worker = await storage.getWorker(req.params.id);
      if (!worker) {
        return res.status(404).json({ message: "Worker not found" });
      }
      
      const user = await storage.getUser(worker.userId);
      const reviews = await storage.getReviewsByWorker(worker.userId);
      
      res.json({ ...worker, user, reviews });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch worker", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/workers/user/:userId", async (req, res) => {
    try {
      const worker = await storage.getWorkerByUserId(req.params.userId);
      if (!worker) {
        return res.status(404).json({ message: "Worker profile not found" });
      }
      res.json(worker);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch worker profile", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.put("/api/workers/:id/availability", async (req, res) => {
    try {
      const { isAvailable } = req.body;
      const worker = await storage.updateWorker(req.params.id, { isAvailable });
      res.json(worker);
    } catch (error) {
      res.status(500).json({ message: "Failed to update availability", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/bookings/user/:userId", async (req, res) => {
    try {
      const bookings = await storage.getBookingsByUser(req.params.userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/bookings/worker/:workerId", async (req, res) => {
    try {
      const bookings = await storage.getBookingsByWorker(req.params.workerId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch worker bookings", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.put("/api/bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await storage.updateBooking(req.params.id, { status });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Wallet routes
  app.get("/api/wallet/:userId", async (req, res) => {
    try {
      const wallet = await storage.getWallet(req.params.userId);
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      const transactions = await storage.getTransactionsByUser(req.params.userId);
      res.json({ wallet, transactions });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallet", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.post("/api/wallet/:userId/transaction", async (req, res) => {
    try {
      const { amount, type, description, bookingId } = req.body;
      const transaction = await storage.createTransaction({
        userId: req.params.userId,
        amount: amount.toString(),
        type,
        description,
        bookingId,
        status: "completed",
      });
      
      // Update wallet balance for earnings
      if (type === "earning") {
        await storage.updateWalletBalance(req.params.userId, Number(amount));
      }
      
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Failed to create transaction", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // For Vercel deployment, don't create server
  if (process.env.VERCEL) {
    return;
  }

  const httpServer = createServer(app);
  return httpServer;
}
