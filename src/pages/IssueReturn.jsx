import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const IssueReturn = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  // Load books and members from localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);

    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    setMembers(storedMembers);
  }, []);

  const handleIssue = () => {
    if (!selectedBookId || !selectedMemberId) {
      toast.error("Select both book and member", { autoClose: 2000 });
      return;
    }

    const bookIndex = books.findIndex(b => b.id === Number(selectedBookId));
    const memberIndex = members.findIndex(m => m.id === Number(selectedMemberId));

    if (bookIndex === -1 || memberIndex === -1) {
      toast.error("Invalid book or member", { autoClose: 2000 });
      return;
    }

    const book = books[bookIndex];
    const member = members[memberIndex];

    if (book.availableCopies <= 0) {
      toast.error("No copies available for this book", { autoClose: 2000 });
      return;
    }

    // Update book copies
    const updatedBooks = [...books];
    updatedBooks[bookIndex].availableCopies -= 1;
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    // Update member's issuedBooks
    const updatedMembers = [...members];
    updatedMembers[memberIndex].issuedBooks.push({
      id: book.id,
      title: book.title
    });
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));

    toast.success(`Book "${book.title}" issued to ${member.name}`, { autoClose: 2000 });
  };

  const handleReturn = (memberId, bookId) => {
    const memberIndex = members.findIndex(m => m.id === memberId);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (memberIndex === -1 || bookIndex === -1) return;

    const updatedMembers = [...members];
    updatedMembers[memberIndex].issuedBooks = updatedMembers[memberIndex].issuedBooks.filter(
      ib => ib.id !== bookId
    );
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));

    const updatedBooks = [...books];
    updatedBooks[bookIndex].availableCopies += 1;
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    toast.success(`Book "${books[bookIndex].title}" returned by ${members[memberIndex].name}`, { autoClose: 2000 });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Issue / Return Books</h1>

      {/* Issue Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} ({b.availableCopies} available)
            </option>
          ))}
        </select>

        <select
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Select Member</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.issuedBooks.length} issued)
            </option>
          ))}
        </select>

        <button
          onClick={handleIssue}
          className="px-2 py-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:bg-blue-600 cursor-pointer" 
        >
          Issue Book
        </button>
      </div>

      {/* Issued Books */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Issued Books</h2>
        {members.filter(m => m.issuedBooks.length > 0).length === 0 ? (
          <p className="text-gray-500">No books issued</p>
        ) : (
          members.map((m) =>
            m.issuedBooks.map((b) => (
              <div key={`${m.id}-${b.id}`} className="flex justify-between items-center border-b py-2">
                <span>{b.title} → {m.name}</span>
                <button
                  onClick={() => handleReturn(m.id, b.id)}
                  className="px-4 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer" 
                >
                  Return
                </button>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default IssueReturn;
