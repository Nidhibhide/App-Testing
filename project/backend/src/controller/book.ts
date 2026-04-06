import { Request, Response } from 'express';
import BookModel from '../model/book';

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, price, publishedYear, genre } = req.body;

    const newBook = await BookModel.create({
      title,
      author,
      price,
      publishedYear,
      genre,
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create book',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get a single book by ID
export const getBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve book',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, author, price, publishedYear, genre } = req.body;

    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      {
        title,
        author,
        price,
        publishedYear,
        genre,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update book',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all books using aggregation with filters
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      genre,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build match stage for filters
    const matchStage: any = {};

    if (genre) {
      matchStage.genre = { $regex: genre, $options: 'i' };
    }

    if (search) {
      matchStage.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } },
      ];
    }

    // Aggregation pipeline
    const result = await BookModel.aggregate([
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limitNum },
    ]);

    // Get total count for pagination
    const total = await BookModel.countDocuments(matchStage);
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
