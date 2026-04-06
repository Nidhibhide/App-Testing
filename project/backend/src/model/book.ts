import mongoose from 'mongoose';
import IBook from '../types/IBook';

const BookSchema = new mongoose.Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;