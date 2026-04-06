import { Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  publishedYear: number;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}
export default IBook;