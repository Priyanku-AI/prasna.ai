import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

// test route
app.use('/api/test', (req, res) => {
  res.json({ message: 'Test route' });
});

// API routes
app.use("/api/task", taskRoutes);

export default app;