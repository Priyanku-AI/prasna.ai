import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  question: text("question").notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  answer: text("answer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
