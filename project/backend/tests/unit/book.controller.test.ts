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
  test("should create book successfully", async () => {
    //FAKE DB RESPONSE
    (BookModel.create as jest.Mock).mockResolvedValue({
      _id: "123",
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });
    const response = await request(app).post("/api/book").send({
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
});
