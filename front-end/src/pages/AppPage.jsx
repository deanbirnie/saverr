import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BudgetCard from "../components/BudgetCard";

export default function AppPage() {
  const navigate = useNavigate();
  const [budgetIds, setBudgetIds] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/app/find-budgets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 404) {
          setBudgetIds("default");
        }
        if (res.status === 200) {
          const data = await res.json();
          if (data) {
            setBudgetIds(data);
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  if (budgetIds === "default") {
    return (
      <div>Please create your first budget by clicking on the button.</div>
    );
  }
  if (!budgetIds || !budgetIds.length || budgetIds === null) {
    return <div className="m-14 font-bold text-2xl">Loading data...</div>;
  }

  const handleAddBudget = () => {};

  const handleNavBudget = (budgetId) => {
    navigate(`/budget/${budgetId}`);
  };

  return (
    <div className="mx-auto text-center m-10">
      <div className="mx-auto max-w-screen-2xl p-4 flex items-center justify-between">
        <h1>Select Your budget</h1>
        <button
          className="uppercase rounded-lg bg-green-100 border font-semibold max-h-10"
          onClick={handleAddBudget}
        >
          New Budget
        </button>
      </div>
      {budgetIds.map((id) => (
        <div key={id}>
          <a href="#" onClick={() => handleNavBudget(id)}>
            <BudgetCard id={id} />
          </a>
        </div>
      ))}
    </div>
  );
}
