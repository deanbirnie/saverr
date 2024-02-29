import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import BudgetRemainingCard from "../components/BudgetRemainingCard";

export default function BudgetPage() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const cardCount = 5;
  const cardNumbers = Array.from({ length: cardCount }, (_, index) => index);

  useEffect(() => {
    const fetchBudgetData = () => {
      setIncome(0);
      setExpenses(0);
    };
    fetchBudgetData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 max-w-screen-2xl max-h-5 mx-auto pb-16">
      <BudgetRemainingCard income={income || 0} expenses={expenses || 0} />
      {cardNumbers.map((cardNumber) => (
        <CategoryCard key={cardNumber} cardNumber={cardNumber} />
      ))}
    </div>
  );
}
