import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  email: text("email"),
  role: text("role").notNull(), // 'worker' | 'employer'
  profileImageUrl: text("profile_image_url"),
  location: text("location"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workers = pgTable("workers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  bio: text("bio"),
  skills: jsonb("skills").$type<string[]>().default([]),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  experience: integer("experience"), // years
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  isAvailable: boolean("is_available").default(true),
  serviceAreas: jsonb("service_areas").$type<string[]>().default([]),
  completedJobs: integer("completed_jobs").default(0),
  responseTime: text("response_time"), // 'fast', 'medium', 'slow'
  backgroundCheck: boolean("background_check").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employerId: varchar("employer_id").notNull().references(() => users.id),
  workerId: varchar("worker_id").notNull().references(() => users.id),
  serviceId: varchar("service_id").notNull().references(() => services.id),
  date: timestamp("date").notNull(),
  duration: integer("duration").notNull(), // hours
  address: text("address").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  addOns: jsonb("add_ons").$type<string[]>().default([]),
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingId: varchar("booking_id").notNull().references(() => bookings.id),
  reviewerId: varchar("reviewer_id").notNull().references(() => users.id),
  revieweeId: varchar("reviewee_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  bookingId: varchar("booking_id").references(() => bookings.id),
  type: text("type").notNull(), // 'earning', 'payout', 'payment'
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  balance: decimal("balance", { precision: 10, scale: 2 }).default("0"),
  pendingAmount: decimal("pending_amount", { precision: 10, scale: 2 }).default("0"),
  thisMonthEarnings: decimal("this_month_earnings", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWorkerSchema = createInsertSchema(workers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Worker = typeof workers.$inferSelect;
export type InsertWorker = z.infer<typeof insertWorkerSchema>;

export type Service = typeof services.$inferSelect;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Wallet = typeof wallets.$inferSelect;
