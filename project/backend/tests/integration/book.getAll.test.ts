import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import BookModel from "../../src/model/book";
import DBConnect from "../../src/dbConnect/MongoDb";

describe("Get All Books API - Integration Test", () => {
  // Connect to real DB before all tests
  beforeAll(async () => {
    await DBConnect();
  });

  // Clear books collection after each test
  afterEach(async () => {
    await BookModel.deleteMany({});
  });

  // Close DB connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //TEST 1 - FETCH ALL BOOKS
  test("should fetch all books successfully", async () => {
    //Insert some books
    await BookModel.create([
      {
        title: "Atomic Habits",
        author: "James Clear",
        price: 499,
        publishedYear: 2018,
        genre: "Self Help",
      },
      {
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen Covey",
        price: 599,
        publishedYear: 1989,
        genre: "Self Help",
      },
    ]);

    const res = await request(app).get("/api/books");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Books retrieved successfully");
    expect(res.body.data.length).toBe(2);
    expect(res.body.pagination.total).toBe(2);
  });

  // TEST 2 - Search query works
  test("should fetch books matching the search query", async () => {
    await BookModel.create([
      {
        title: "Atomic Habits",
        author: "James Clear",
        price: 499,
        publishedYear: 2018,
        genre: "Self Help",
      },
      {
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen Covey",
        price: 599,
        publishedYear: 1989,
        genre: "Self Help",
      },
    ]);

    const res = await request(app).get("/api/books");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("");
    expect(res.body.data.length).toBe(2);
    expect(res.body.pagination.total);
  });


 
});
