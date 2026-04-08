import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";

//MOCK MONGOOSE MODEL - PREVENTS REAL DB CONNECTION
jest.mock("../../src/model/book");
describe("Create book api test ", () => {
  //RESET MOCK AFTER EVERY TEST
  afterEach(() => {
    jest.clearAllMocks();
  });

  //TEST 1- SUCCESS CASE
  //Check API works correctly when valid data is sent.
  test("should create book successfully", async () => {
    //FAKE DB RESPONSE - What DATABASE returns
    //Pretend the database saved it and returned this result.
    (BookModel.create as jest.Mock).mockResolvedValue({
      // _id: "123",
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    //This is the request payload.
    const response = await request(app).post("/api/books").send({
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    //EXPECTATIONS
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Book created successfully");
  });

  //TEST CASE - 2
  //Check API handles wrong input.
  test("", async () => {
    const res = await request(app).post("/api/books").send({
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    //VALIDATION MIDDLEWARE STOPS REQUEST CONTROLLER NOT EXECUTED
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  //TEST CASE - 3
  //Check what happens when something breaks internally.
  test("Should return 500 when database throws error", async () => {
    //We pretend the database fails and BookModel.create returns an error.
    (BookModel.create as jest.Mock).mockRejectedValue(
      new Error("Database crashed"),
    );

    const res = await request(app).post("/api/books").send({
      // _id: "123",
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Failed to create book");
  });
});
