import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    membershipId: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  /* LOAD MEMBERS */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("members")) || [];
    setMembers(stored);
  }, []);

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setNewMember({ ...newMember, [name]: value.slice(0, 15) });
    } else {
      setNewMember({ ...newMember, [name]: value });
    }
  };

  /* ADD MEMBER */
  const handleAddMember = () => {
    const { name, email, phone, membershipId } = newMember;
    if (!name || !email || !phone || !membershipId) {
      toast.error("All fields are required", { autoClose: 2000 });
      return;
    }

    const emailExists = members.some((m) => m.email === email);
    const idExists = members.some((m) => m.membershipId === membershipId);

    if (emailExists || idExists) {
      toast.error("Email or Membership ID already exists", { autoClose: 2000 });
      return;
    }

    const updated = [
      ...members,
      { id: Date.now(), ...newMember, status: "active", issuedBooks: [] },
    ];

    setMembers(updated);
    localStorage.setItem("members", JSON.stringify(updated));
    toast.success("Member added successfully", { autoClose: 2000 });
    setNewMember({ name: "", email: "", phone: "", membershipId: "" });
    setCurrentPage(1);
  };

  /* BLOCK / UNBLOCK */
  const toggleStatus = (id) => {
    const updated = members.map((m) =>
      m.id === id
        ? { ...m, status: m.status === "active" ? "blocked" : "active" }
        : m
    );
    setMembers(updated);
    localStorage.setItem("members", JSON.stringify(updated));
  };

  /* DELETE MEMBER */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      const updated = members.filter((m) => m.id !== id);
      setMembers(updated);
      localStorage.setItem("members", JSON.stringify(updated));
      toast.success("Member deleted", { autoClose: 2000 });
      setCurrentPage(1);
    }
  };

  /* PAGINATION LOGIC */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMembers = members.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(members.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Manage Members
      </h1>

      {/* ADD MEMBER FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {["name", "email", "phone", "membershipId"].map((f) => (
            <input
              key={f}
              name={f}
              type="text"
              value={newMember[f]}
              onChange={handleChange}
              placeholder={f}
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddMember}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md cursor-pointer"
          >
            + Add Member
          </motion.button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {members.length === 0 && (
        <div className="flex items-center justify-center h-[50vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-2xl bg-white shadow-md border border-dashed border-gray-300"
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              No Members Available 👥
            </h2>
            <p className="text-gray-500 mt-2">
              Please add members to manage them here.
            </p>
          </motion.div>
        </div>
      )}

      {/* MEMBERS LIST */}
      {members.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white rounded-xl shadow">
            <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-2 text-sm font-semibold text-gray-500 border-b">
              <span>Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Member ID</span>
              <span>Status</span>
              <span className="text-center">Actions</span>
            </div>

            {currentMembers.map((m) => (
              <div
                key={m.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 py-3 items-center border-b hover:bg-gray-50"
              >
                <span className="font-medium">{m.name}</span>
                <span>{m.email}</span>
                <span>{m.phone}</span>
                <span>{m.membershipId}</span>
                <span
                  className={`font-medium ${
                    m.status === "active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {m.status}
                </span>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => toggleStatus(m.id)}
                    className={`px-4 py-1 rounded-lg text-white cursor-pointer ${
                      m.status === "active" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {m.status === "active" ? "Block" : "Unblock"}
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="px-4 py-1 rounded-lg bg-gray-400 text-white cursor-pointer hover:bg-gray-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && members.length > 0 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-2 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Members;
