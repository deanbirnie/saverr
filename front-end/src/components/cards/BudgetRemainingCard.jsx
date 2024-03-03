import React, { useEffect, useState } from "react";

export default function BudgetRemainingCard({ income, expenses }) {
  const [remainingBudgetValue, setRemainingBudgetValue] = useState(0);
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    const calculateRemainingBudget = () => {
      const remainingValue = income - expenses;
      setRemainingBudgetValue(remainingValue);

      if (remainingValue >= 0) {
        setCardColor("bg-green-400");
      } else {
        setCardColor("bg-red-400");
      }
    };
    calculateRemainingBudget();
  }, [income, expenses]);

  return (
    <div
      className={`p-5 rounded-md ${cardColor} max-w-screen-2xl mx-10 mt-10 shadow-md border`}
    >
      <div className="flex flex-wrap justify-between gap-10">
        <h1>Left to Budget: </h1>
        {remainingBudgetValue ? <h1>{remainingBudgetValue}</h1> : <h1>0</h1>}
      </div>
    </div>
  );
}
