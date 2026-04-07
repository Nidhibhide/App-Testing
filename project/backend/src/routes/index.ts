import express, { Request, Response } from "express";
import userRoutes from "./book";


const router = express.Router();

// Health check route
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("🚀 Backend is running!");
});

// Mount other routes
router.use("/books", userRoutes);


export default router;