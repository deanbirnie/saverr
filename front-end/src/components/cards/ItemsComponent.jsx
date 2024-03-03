import React, { useState } from "react";
import AddItemForm from "../forms/AddItemForm";

export default function ItemsComponent({ itemsList }) {
  return (
    <div className="px-5 py-2">
      {itemsList.map((item, index) => {
        return (
          <div key={index} className="flex justify-between mx-auto">
            <h1 className="font-semibold text-lg ">{item.name}</h1>
            <p className="font-semibold text-lg ">R {item.value}</p>
          </div>
        );
      })}
      <AddItemForm />
    </div>
  );
}
