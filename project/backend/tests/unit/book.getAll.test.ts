import request from "supertest";
import BookModel from "../../src/model/book";
import app from "../../src/app";

//MOCK MONGOOSE MODEL - PREVENTS REAL DB CONNECTION
jest.mock("../../src/model/book");

//test cases for getAll books
describe("Get All Books API ", () => {
  //clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  //TEST CASE 1 - Should fetch all books successfully
  test("should fetch all books successfully", async () => {
    //fake db response for aggregation
    const Books = [
      {
        _id: "123",
        title: "Atomic Habits",
        author: "James Clear",
        price: 499,
        publishedYear: 2018,
        genre: "Self Help",
      },
      {
        _id: "124",
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen Covey",
        price: 599,
        publishedYear: 1989,
        genre: "Self Help",
      },
    ];

    (BookModel.aggregate as jest.Mock).mockResolvedValue(Books);
    (BookModel.countDocuments as jest.Mock).mockResolvedValue(Books.length);

    const res = await request(app).get("/api/books");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Books retrieved successfully");
    expect(res.body.pagination.total).toBe(2);
    expect(res.body.pagination.page).toBe(1);
    expect(res.body.pagination.limit).toBe(10);
  });

  //TEST CASE 2 - Search query
  test("should fetch books matching the search query", async () => {
    //fake db response for search query
    const searchBooks = [
      {
        _id: "123",
        title: "Atomic Habits",
        author: "James Clear",
        price: 499,
        publishedYear: 2018,
        genre: "Self Help",
      },
    ];

    (BookModel.aggregate as jest.Mock).mockResolvedValue(searchBooks);
    (BookModel.countDocuments as jest.Mock).mockResolvedValue(
      searchBooks.length,
    );

    const res = await request(app).get("/api/books?search=Habit");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Books retrieved successfully");
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].title).toContain("Habit");
    expect(res.body.pagination.total).toBe(1);
  });

  //TEST CASE 3 - Genre filter works
  test("should fetch books filtered by genre", async () => {
    const genreBooks = [
      {
        _id: "123",
        title: "Atomic Habits",
        author: "James Clear",
        price: 499,
        publishedYear: 2018,
        genre: "Self Help",
      },
    ];
    (BookModel.aggregate as jest.Mock).mockResolvedValue(genreBooks);
    (BookModel.countDocuments as jest.Mock).mockResolvedValue(
      genreBooks.length,
    );

    const res = await request(app).get("/api/books?genre=Self Help");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Books retrieved successfully");

    expect(res.body.data.length).toBe(1);
  });
});
