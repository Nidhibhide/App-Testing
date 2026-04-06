import { Request, Response, NextFunction } from 'express';
import {
  createBookValidation,
  updateBookValidation,
} from '../validation/book';

export const createBookMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createBookValidation.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({
      success: false,
      message,
    });
  }
  next();
};

export const updateBookMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateBookValidation.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({
      success: false,
      message,
    });
  }
  next();
};




