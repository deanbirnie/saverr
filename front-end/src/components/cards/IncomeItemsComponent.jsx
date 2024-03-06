import React, { useState } from "react";
import AddIncomeItemForm from "../forms/AddIncomeItemForm.jsx";
import PropTypes from "prop-types";
import { TiDelete } from "react-icons/ti";
import { deleteIncomeItem } from "../../api-requests/itemAPI.js";

export default function IncomeItemsComponent({ categoryObj }) {
  const [items, setItems] = useState(categoryObj.incomeItems || []);
  const categoryId = categoryObj.id || "";
  const budgetId = categoryObj.budgetId || "";

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteIncomeItem(itemId);
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
      <AddIncomeItemForm
        budgetId={budgetId}
        categoryId={categoryId}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
