import React, { useState } from "react";

export default function AddCategoryModal({ onClose, onSave, categories }) {
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectCategoryInput, setSelectCategoryInput] = useState(true);
  const [existingCategories, setExistingCategories] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (formData.categoryName === undefined) {
      setErrorMsg("Please enter a category name.");
    }
    if (formData.categoryName === "Select Category...") {
      setErrorMsg("Please select a category, or add a new category.");
    }
    if (formData.categoryName in existingCategories) {
      setErrorMsg("Category already in use.");
    }
    if (errorMsg === null) {
      onClose();
    }
  };

  const handleSwitchInputs = () => {
    setSelectCategoryInput(!selectCategoryInput);
    setFormData({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-lg max-w-2xl mx-10 min-w-96">
        <h2 className="text-2xl font-bold mb-10">New Category</h2>
        <div className="my-2">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Default value on page load is to show the category selection dropdown */}
            {selectCategoryInput && (
              <div className="flex justify-between gap-5 items-center border rounded-lg p-3">
                <label className="font-semibold text-xl">
                  Select Category:
                </label>
                <select
                  id="categoryName"
                  className="block appearance-none mx-auto bg-white border p-2 rounded focus:outline-none focus:ring"
                >
                  {!categories && (
                    <option value="" disabled selected>
                      Select Category...
                    </option>
                  )}
                  {categories !== undefined &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {/* When toggled, new category form will replace category selector */}
            {!selectCategoryInput && (
              <div className="flex justify-between gap-5 items-center border rounded-lg p-3">
                <label className="font-semibold text-xl">Category Name:</label>
                <input
                  type="text"
                  id="categoryName"
                  placeholder="Enter category name"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />
              </div>
            )}
            {/* Error message if unable to submit */}
            {errorMsg && (
              <div className="text-red-600 font-semibold">{errorMsg}</div>
            )}
            {/* Form Submit Button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 mx-auto w-full max-w-40">
              Submit
            </button>
          </form>
        </div>
        {/* Modal Buttons */}
        <div className="flex flex-col gap-2 mx-auto max-w-40">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSwitchInputs}
          >
            {selectCategoryInput ? "New Category" : "Select Category"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
