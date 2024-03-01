import React from "react";

export default function ItemsComponent({ itemsList }) {
  console.log(typeof itemsList, itemsList);
  return (
    <div>
      {itemsList.map((item, index) => {
        return (
          <div key={index} className="flex justify-between mx-auto">
            <h1>{item.name}</h1>
            <p>{item.value}</p>
          </div>
        );
      })}
      <p className="font-bold text-2xl">+</p>
    </div>
  );
}
