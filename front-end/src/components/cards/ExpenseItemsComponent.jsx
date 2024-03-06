import React, { useState } from "react";
import AddExpenseItemForm from "../forms/AddExpenseItemForm.jsx";
import PropTypes from "prop-types";
import { TiDelete } from "react-icons/ti";
import { deleteExpenseItem } from "../../api-requests/itemAPI.js";

export default function ExpenseItemsComponent({ categoryObj }) {
  const [items, setItems] = useState(categoryObj.expenseItems || []);
  const categoryId = categoryObj.id || "";
  const budgetId = categoryObj.budgetId || "";

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteExpenseItem(itemId);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="px-5 py-2">
      {items.map((item) => {
        return (
          <div key={item.id} className="flex justify-between mx-auto">
            <h1 className="font-semibold text-lg ">{item.name}</h1>
            <p className="font-semibold text-lg ">ZAR {item.value}</p>
            <TiDelete
              onClick={() => {
                handleDeleteItem(item.id);
              }}
              className="size-5 hover:opacity-80 hover:scale-110"
              cursor={"pointer"}
            />
          </div>
        );
      })}
      <AddExpenseItemForm
        budgetId={budgetId}
        categoryId={categoryId}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
