import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";
import DBConnect from "../../src/dbConnect/MongoDb";
import mongoose from "mongoose";

describe("Create Book API - Integration Test", () => {
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
  test("should create book successfully", async () => {
    const res = await request(app).post("/api/books").send({
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    //VERIFY REAL DATABASE SAVE
    const book = await BookModel.findOne({
      title: "Atomic Habits",
    });

    expect(book).not.toBeNull();
    expect(book?.author).toBe("James Clear");
  });

  //TEST 2 - VALIDATION ERROR
  test("should fail when title missing", async () => {
    const res = await request(app).post("/api/books").send({
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  //TEST 3 - NEGATIVE PRICE
  test("should fail when price is negative", async () => {
    const res = await request(app).post("/api/books").send({
      title: "Bad Book",
      author: "Test",
      price: -10,
      publishedYear: 2018,
      genre: "Test",
    });

    expect(res.status).toBe(400);
  });
});
