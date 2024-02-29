import React, { useState } from "react";

export default function AddItemModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-lg max-w-xl mx-10">
        <h2 className="text-2xl font-bold mb-4">Add Item</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
