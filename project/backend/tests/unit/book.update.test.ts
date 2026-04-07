import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";

//MOCK MONGOOSE MODEL - PREVENTS REAL DB CONNECTION
jest.mock("../../src/model/book");

//test cases for update by ID api
//TEST CASE 1 - Successful Update

describe("Update Book API Test", () => {
  //clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  //TEST CASE 1 - Successful Update
  test("should update successfully", async () => {
    //fake db response
    (BookModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: "123",
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    });
    const response = await request(app).put("/api/books/123").send({
      title: "Atomic Habits Updated",
      price: 599,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Book updated successfully");
  });
});

//TEST CASE 2 - Book NOT Found
test("should return 404 if book not found", async () => {
  (BookModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

  const res = await request(app).put("/api/books/123").send({
    title: "New Title",
  });
  expect(res.status).toBe(404);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toBe("Book not found");
});
