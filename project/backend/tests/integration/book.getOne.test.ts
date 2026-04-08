import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";
import DBConnect from "../../src/dbConnect/MongoDb";
import mongoose from "mongoose";

describe("Get Book By ID API - Integration Test", () => {
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

  //TEST 1 - SUCCESS
  test("should return book when valid id is provided", async () => {
    //first create a book in db
    const book = await BookModel.create({
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    const res = await request(app).get(`/api/books/${book._id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Book retrieved successfully");
    expect(res.body.data._id).toBe(book._id.toString());
    expect(res.body.data.title).toBe("Atomic Habits");
  });

  //TEST 2 - BOOK NOT FOUND
  test("should return 404 if book not found", async () => {
    const fakeID = new mongoose.Types.ObjectId(); //random valid Objectid
    const res = await request(app).get(`/api/books/${fakeID}`);

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Book not found");
  });
});
