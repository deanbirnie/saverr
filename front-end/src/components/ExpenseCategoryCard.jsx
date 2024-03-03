import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ItemsComponent from "./ItemsComponent";

export default function ExpenseCategoryCard({ category }) {
  const [toggleExpand, setToggleExpand] = useState(false);

  const handleToggleExpand = () => {
    setToggleExpand(!toggleExpand);
  };

  return (
    <div className="border-2 border-slate-50 bg-white rounded-lg shadow-lg p-5 mx-10">
      <div className="flex justify-between">
        <h1 className="font-bold underline text-xl">{category.name}</h1>
        <div className="p-3">
          {!toggleExpand ? (
            <BiChevronDown
              cursor={"pointer"}
              className="size-5 hover:opacity-80 hover:scale-150"
              onClick={handleToggleExpand}
            />
          ) : (
            <BiChevronUp
              cursor={"pointer"}
              className="size-5 hover:opacity-80 hover:scale-150"
              onClick={handleToggleExpand}
            />
          )}
        </div>
      </div>
      {!toggleExpand ? (
        <p>Click to expand...</p>
      ) : (
        <ItemsComponent itemsList={category.expenseItems} />
      )}
    </div>
  );
}
