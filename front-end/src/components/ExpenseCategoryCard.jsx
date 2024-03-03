import React, { useState } from "react";
import ItemsComponent from "./ItemsComponent";

export default function ExpenseCategoryCard({ category }) {
  const [toggleExpand, setToggleExpand] = useState(false);

  const handleToggleExpand = () => {
    setToggleExpand(!toggleExpand);
  };

  return (
    <a
      href="#"
      className="border-slate-500 bg-white rounded-lg shadow-md p-5 mx-10"
      onClick={handleToggleExpand}
    >
      <div>
        <h1>{category.name}</h1>
        {!toggleExpand ? (
          <p>Click to expand...</p>
        ) : (
          <ItemsComponent itemsList={category.expenseItems} />
        )}
      </div>
    </a>
  );
}
