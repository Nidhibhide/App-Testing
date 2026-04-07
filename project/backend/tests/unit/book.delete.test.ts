import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";

//MOCK MONGOOSE MODEL - PREVENTS REAL DB CONNECTION
jest.mock("../../src/model/book");

describe("Delete Book API Test", () => {
  //Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  //test cases for delete by ID api
  //TEST CASE 1 - Book deleted successfully
  test("should delete book successfully", async () => {
    //fake db response for deleted book
    (BookModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
      _id: "123",
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });

    const res = await request(app).delete("/api/books/123");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Book deleted successfully");
    expect(res.body.data._id).toBe("123");
  });

  test("should return 404 if book not found", async () => {
    //fake db response
    (BookModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete("/api/books/123");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Book not found");
  });
});
