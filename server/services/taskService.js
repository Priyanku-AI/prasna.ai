import { db } from "../db/client.js";
import { tasks } from "../db/schema.js";
import { eq } from "drizzle-orm";

// Add task to DB
export async function addTask(url, question) {
    const result = await db.insert(tasks).values({ url, question }).returning();
    return result[0];
}

// Fetch task by ID
export async function fetchTaskById(id) {
  console.log("the id in service is", id);
  const result = await db.select().from(tasks).where(eq(tasks.id, Number(id)));
  return result[0];
}
