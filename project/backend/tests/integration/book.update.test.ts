import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import BookModel from "../../src/model/book";
import DBConnect from "../../src/dbConnect/MongoDb";

describe("Update Book API - Integration Test", () => {
  // Connect to the database before all tests
  beforeAll(async () => {
    await DBConnect();
  });

  // Clear the books collection after each test
  afterEach(async () => {
    await BookModel.deleteMany({});
  });

  // Close DB connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //TEST CASE 1 - Successful Update
  test("should update book successfully", async () => {
    //First  create a book in DB
    const book = await BookModel.create({
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    const res = await request(app).put(`/api/books/${book._id}`).send({
      title: "Atomic Habits Updated",
      price: 599,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Book updated successfully");
    expect(res.body.data.title).toBe("Atomic Habits Updated");
    expect(res.body.data.price).toBe(599);

    //verify DB is actually updated
    const updatedBook = await BookModel.findById(book._id);
    expect(updatedBook?.title).toBe("Atomic Habits Updated");
    expect(updatedBook?.price).toBe(599);
  });

  //TEST CASE 2 - BOOK NOT FOUND
  test("should return 404 if book not found", async () => {
    const fakeID = new mongoose.Types.ObjectId(); //random valid ObjectID

    const res = await request(app).put(`/api/books/${fakeID}`).send({
      title: "New Title",
    });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Book not found");
  });
});
