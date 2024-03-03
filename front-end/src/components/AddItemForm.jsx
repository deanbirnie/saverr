import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";

export default function AddItemForm() {
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const handleSubmitForm = () => {};

  const handleCloseForm = () => {
    setShowAddItemForm(false);
  };

  const handleAddItem = () => {
    setShowAddItemForm(true);
  };

  return (
    <div className="p-2 w-full">
      <div className="flex flex-col justify-center items-center">
        {showAddItemForm && (
          <form>
            <input />
            <button
              type="submit"
              className="p-2 rounded-lg border bg-green-200"
            >
              Save
            </button>
            <button
              type="reset"
              className="p-2 rounded-lg border bg-red-200"
              onClick={handleCloseForm}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
      <div className="py-3">
        {!showAddItemForm && (
          <BiPlusCircle
            cursor={"pointer"}
            className="size-5 hover:opacity-80 hover:scale-110"
            onClick={handleAddItem}
          />
        )}
      </div>
    </div>
  );
}
