import { Router } from "express";
import {
  createBook,
  getBook,
  deleteBook,
  updateBook,
  getAllBooks,
} from "../controller/book";
import { createBookMid, updateBookMid } from "../middleware/validation";

const router = Router();

// Create a new book - POST /api/books
router.post("/", createBookMid, createBook);

// Get all books with filters using aggregation - GET /api/books
router.get("/", getAllBooks);

// Get a single book by ID - GET /api/books/:id
router.get("/:id", getBook);

// Update a book by ID - PUT /api/books/:id
router.put("/:id", updateBookMid, updateBook);

// Delete a book by ID - DELETE /api/books/:id
router.delete("/:id", deleteBook);

export default router;
