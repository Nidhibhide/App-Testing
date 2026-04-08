import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import AddBook from "./AddBook";
const BookTable = () => {
  // ✅ Dummy Data
  const booksData = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      publishedYear: 2018,
      genre: "Self Help",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 699,
      publishedYear: 2008,
      genre: "Programming",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 350,
      publishedYear: 1988,
      genre: "Fiction",
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      price: 550,
      publishedYear: 2016,
      genre: "Self Help",
    },
    {
      title: "Refactoring",
      author: "Martin Fowler",
      price: 799,
      publishedYear: 1999,
      genre: "Programming",
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      price: 600,
      publishedYear: 2001,
      genre: "Fiction",
    },
  ];

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const booksPerPage = 3;

  // ✅ Filter
  const filteredBooks = booksData.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchGenre = genre ? book.genre === genre : true;

    return matchSearch && matchGenre;
  });

  // ✅ Pagination
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Book Management</h1>

        {/* ✅ Add Book Button */}
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <FaPlus />
          Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Genres</option>
          <option value="Self Help">Self Help</option>
          <option value="Programming">Programming</option>
          <option value="Fiction">Fiction</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Genre</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">₹{book.price}</td>
                <td className="p-3">{book.publishedYear}</td>
                <td className="p-3">{book.genre}</td>

                {/* ✅ Actions */}
                <td className="p-3">
                  <div className="flex justify-center gap-4 text-lg">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEye />
                    </button>

                    <button className="text-green-500 hover:text-green-700">
                      <FaEdit />
                    </button>

                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {showForm && <AddBook onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default BookTable;
