import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import booksData from "../data/bookData";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    totalCopies: "",
    availableCopies: "",
  });

  const [editBook, setEditBook] = useState({});

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("books"));
    if (stored?.length) {
      setBooks(stored);
    } else {
      setBooks(booksData);
      localStorage.setItem("books", JSON.stringify(booksData));
    }
  }, []);

  /* ---------------- ADD ---------------- */
  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) {
      toast.error("Title & Author required", { autoClose: 2000 });
      return;
    }

    const updated = [
      ...books,
      {
        ...newBook,
        id: Date.now(),
        totalCopies: Number(newBook.totalCopies),
        availableCopies: Number(newBook.availableCopies),
      },
    ];

    setBooks(updated);
    localStorage.setItem("books", JSON.stringify(updated));
    toast.success("Book added", { autoClose: 2000 });

    setNewBook({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      totalCopies: "",
      availableCopies: "",
    });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id) => {
    const updated = books.filter((b) => b.id !== id);
    setBooks(updated);
    localStorage.setItem("books", JSON.stringify(updated));
    toast.success("Book deleted", { autoClose: 2000 });
  };

  /* ---------------- EDIT ---------------- */
  const startEdit = (book) => {
    setEditingId(book.id);
    setEditBook(book);
  };

  const handleEditChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    const updated = books.map((b) =>
      b.id === editingId
        ? {
            ...editBook,
            totalCopies: Number(editBook.totalCopies),
            availableCopies: Number(editBook.availableCopies),
          }
        : b
    );

    setBooks(updated);
    localStorage.setItem("books", JSON.stringify(updated));
    setEditingId(null);
    toast.success("Book updated", { autoClose: 2000 });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Manage Books</h1>
      </div>

      {/* ADD BOOK */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-lg mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {["title", "author", "genre", "isbn", "totalCopies", "availableCopies"].map(
            (f) => (
              <input
                key={f}
                name={f}
                value={newBook[f]}
                onChange={(e) =>
                  setNewBook({ ...newBook, [f]: e.target.value })
                }
                placeholder={f}
                className="border px-3 py-2 rounded-lg text-sm"
              />
            )
          )}
        </div>

        <div className="flex mt-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddBook}
            className="ml-auto px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md cursor-pointer"
          >
            + Add Book
          </motion.button>
        </div>
      </motion.div>

      {/* TABLE HEADER */}
      {books.length > 0 && (
        <div className="hidden md:grid grid-cols-8 gap-4 px-4 py-2 text-sm font-semibold text-gray-500">
          <span>Title</span>
          <span>Author</span>
          <span>Genre</span>
          <span>ISBN</span>
          <span>Total</span>
          <span>Available</span>
          <span className="col-span-2 text-center">Actions</span>
        </div>
      )}

      {/* EMPTY STATE */}
      {books.length === 0 && (
        <div className="flex items-center justify-center h-[50vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-2xl bg-white shadow-md border border-dashed border-gray-300"
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              No Books Available 📚
            </h2>
            <p className="text-gray-500 mt-2">
              Please add books to manage your library.
            </p>
          </motion.div>
        </div>
      )}

      {/* BOOK ROWS */}
      {books.length > 0 && (
        <div className="space-y-3">
          {books.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-8 gap-4 items-center"
            >
              {editingId === book.id ? (
                <>
                  {["title", "author", "genre", "isbn", "totalCopies", "availableCopies"].map(
                    (f) => (
                      <input
                        key={f}
                        name={f}
                        value={editBook[f]}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded text-sm"
                      />
                    )
                  )}
                  <div className="flex gap-2 col-span-2 justify-center">
                    <button
                      onClick={saveEdit}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-1 bg-gray-300 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="font-medium">{book.title}</span>
                  <span>{book.author}</span>
                  <span>{book.genre}</span>
                  <span className="text-sm">{book.isbn}</span>
                  <span>{book.totalCopies}</span>
                  <span>{book.availableCopies}</span>

                  <div className="flex gap-2 col-span-2 justify-center">
                    <button
                      onClick={() => startEdit(book)}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
