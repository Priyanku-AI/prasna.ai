import { Queue } from "bullmq";
import IORedis from "ioredis";
import "../config/env.js";
console.log("the env in instance.js", process.env.REDIS_PORT, process.env.REDIS_HOST)

// Redis connection
export const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,   // BullMQ handles reconnections and retries at the queue level
});

// Create BullMQ queue named "tasks"
export const taskQueue = new Queue("tasks", {
  connection,
});
