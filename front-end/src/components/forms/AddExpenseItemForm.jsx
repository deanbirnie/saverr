import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { addExpenseItem } from "../../api-requests/itemAPI.js";
import PropTypes from "prop-types";

export default function AddItemForm({ budgetId, categoryId, onAddItem }) {
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemValue, setItemValue] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const newItem = await addExpenseItem(
        itemName,
        parseFloat(itemValue),
        budgetId,
        categoryId
      );
      onAddItem(newItem);

      setItemName("");
      setItemValue("");
      setShowAddItemForm(false);
    } catch (error) {
      console.error("There was an error adding the item. " + error);
    }
  };

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
          <form onSubmit={handleSubmitForm}>
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="number"
              step={0.01}
              placeholder="Item Value"
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 rounded-lg border bg-green-200"
            >
              Save
            </button>
            <button
              type="submit"
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

AddItemForm.propTypes = {
  budgetId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  onAddItem: PropTypes.func.isRequired,
};
