import rerat from "react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import booksData from "../data/bookData";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    totalCopies: "",
    availableCopies: "",
  });

  // Load books from localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks && storedBooks.length > 0) {
      setBooks(storedBooks);
    } else {
      setBooks(booksData);
      localStorage.setItem("books", JSON.stringify(booksData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) {
      toast.error("Title & Author are required!", { autoClose: 2000 });
      return;
    }

    const updatedBooks = [
      ...books,
      {
        ...newBook,
        id: Date.now(),
        totalCopies: Number(newBook.totalCopies),
        availableCopies: Number(newBook.availableCopies),
      },
    ];

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    toast.success("Book added successfully!", { autoClose: 2000 });

    setNewBook({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      totalCopies: "",
      availableCopies: "",
    });
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    toast.success("Book deleted!", { autoClose: 2000 });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
        Manage Books
      </h1>

      {/* Add Book Section */}
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            "title",
            "author",
            "isbn",
            "genre",
            "totalCopies",
            "availableCopies",
          ].map((field) => (
            <input
              key={field}
              type={field.includes("Copies") ? "number" : "text"}
              name={field}
              value={newBook[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border border-gray-300 px-4 py-3 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Button Right */}
        <div className="flex">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddBook}
            className="ml-auto px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-500 to-purple-500
            text-white font-medium shadow-md
            hover:shadow-lg transition-all cursor-pointer"
          >
            + Add Book
          </motion.button>
        </div>
      </motion.div>

      {/* Books List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <motion.div
            key={book.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="font-semibold text-xl mb-1">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-500 text-sm">{book.genre}</p>
            <p className="text-gray-500 text-sm">ISBN: {book.isbn}</p>
            <p className="text-gray-500 text-sm mb-4">
              Available: {book.availableCopies}/{book.totalCopies}
            </p>

            <button
              onClick={() => handleDelete(book.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg
              hover:bg-red-600 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Books;
