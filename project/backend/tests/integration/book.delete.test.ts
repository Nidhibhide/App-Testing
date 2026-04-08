import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";
import DBConnect from "../../src/dbConnect/MongoDb";
import mongoose from "mongoose";

describe("Delete Book API - Integration Test", () => {
  //CONNECT REAL TEST DATABASE
  beforeAll(async () => {
    await DBConnect();
  });

  //CLEAR DATABASE AFTER EACH TEST
  afterEach(async () => {
    await BookModel.deleteMany({});
  });

  //CLOSE CONNECTION AFTER ALL TESTS
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //TEST 1 - DELETE SUCCESS
  test("should delete book successfully", async () => {
    const book = await BookModel.create({
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    const res = await request(app).delete(`/api/books/${book._id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Book deleted successfully");
    expect(res.body.data._id).toBe(book._id.toString());

    //verify db
    const deleted = await BookModel.findById(book._id);
    expect(deleted).toBeNull();
  });

  //TEST 2 - DELETE FAIL ( NOT FOUND )
  test("should return 404 if book not found", async () => {
    const fakeID = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/books/${fakeID}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message);
  });
});
