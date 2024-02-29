import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemsComponent from "./ItemsComponent";

export default function CategoryCard({ cardNumber }) {
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
        <h1>Category Card: {cardNumber + 1}</h1>
        {!toggleExpand ? <p>Click to expand...</p> : <ItemsComponent />}
      </div>
    </a>
  );
}

CategoryCard.propTypes = {
  cardNumber: PropTypes.number.isRequired,
};
