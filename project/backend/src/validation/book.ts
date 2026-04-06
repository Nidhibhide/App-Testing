import Joi from 'joi';

// Validation rules for creating a book
export const createBookValidation = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  author: Joi.string().min(1).max(150).required(),
  price: Joi.number().min(0).max(999999.99).required(),
  publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear() + 1).required(),
  genre: Joi.string().min(1).max(50).required(),
});

// Validation rules for updating a book (all fields optional)
export const updateBookValidation = Joi.object({
  title: Joi.string().min(1).max(200),
  author: Joi.string().min(1).max(150),
  price: Joi.number().min(0).max(999999.99),
  publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear() + 1),
  genre: Joi.string().min(1).max(50),
});



