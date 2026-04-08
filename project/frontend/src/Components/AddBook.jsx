import React, { useState } from "react";

const AddBook = ({ onClose }) => {

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    publishedYear: "",
    genre: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Book Data:", formData);

    alert("Book Added Successfully ✅");

    onClose(); // close modal
  };

  return (
<div className="fixed inset-0 backdrop-blur-sm bg-white/50 flex justify-center items-center z-50">

      {/* Modal */}
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Author */}
          <input
            type="text"
            name="author"
            placeholder="Author"
            required
            value={formData.author}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Published Year */}
          <input
            type="number"
            name="publishedYear"
            placeholder="Published Year"
            required
            value={formData.publishedYear}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Genre */}
          <select
            name="genre"
            required
            value={formData.genre}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Genre</option>
            <option value="Self Help">Self Help</option>
            <option value="Programming">Programming</option>
            <option value="Fiction">Fiction</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Book
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddBook;