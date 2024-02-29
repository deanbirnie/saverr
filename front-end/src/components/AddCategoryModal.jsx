import React, { useState } from "react";

export default function AddCategoryModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({});
  const [updateMsg, setUpdateMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateMsg === null) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-lg max-w-xl mx-10 min-w-96">
        <h2 className="text-2xl font-bold mb-4">New Category</h2>
        <div className="my-5">
          <form
            className="mt-5 flex flex-col justify-between gap-2"
            onSubmit={handleSubmit}
          >
            <label>Category Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />
          </form>
          {updateMsg && (
            <div className="text-red-600 font-semibold">{updateMsg}</div>
          )}
        </div>
        <div className="flex gap-4 ms-auto">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-20"
            onClick={onSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-20"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
