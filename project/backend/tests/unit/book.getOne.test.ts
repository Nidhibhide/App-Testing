import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";

//MOCK MONGOOSE MODEL - PREVENTS REAL DB CONNECTION
jest.mock("../../src/model/book");
//test cases for get by ID api
//TEST CASE 1 - Book Found Successfully
describe("Get Book By Id api test", () => {
  //RESET MOCK AFTER EVERY TEST
  afterEach(() => {
    jest.clearAllMocks();
  });
  //TEST CASE 1 -  Book Found Successfully
  test("Should return book when valid id is provided", async () => {
    //Fake db response
    (BookModel.findById as jest.Mock).mockResolvedValue({
      _id: "123",
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });
    const res = await request(app).get("/api/books/123");
    expect(BookModel.findById).toHaveBeenCalledWith("123");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Book retrieved successfully");
  });

  //TEST CASE 2 - Book NOT Found
  test("should return 404 if book not found", async () => {
    //DB returns null
    (BookModel.findById as jest.Mock).mockResolvedValue(null);
    const res = await request(app).get("/api/books/124");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Book not found");
  });
});
