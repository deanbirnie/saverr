import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function BudgetCard({ id }) {
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch(`/api/app/get-budget-info?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setBudgetData(data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBudget();
  }, [id]);

  if (budgetData === null) {
    return <div className="m-14 font-semibold text-2xl">Loading data...</div>;
  }

  //   if (budgetData === budgetData.length === 0 || Object.keys(budgetData).length === 0) {
  //     return <div></div>
  //   }

  const handleNavBudget = (id) => {
    navigate(`/budget/${id}`);
  };

  return (
    <div className="flex flex-col border rounded-lg p-10 bg-slate-50 hover:bg-slate-200 hover:shadow-md hover:scale-110">
      <h1 className="font-semibold text-lg me-auto">Budget:</h1>
      <div className="flex justify-between mt-4">
        <p className="font-semibold me-auto">Month:</p>
        <p className="font-semibold ms-auto">{budgetData.month}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-semibold me-auto">Year:</p>
        <p className="font-semibold ms-auto">{budgetData.year}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <button
          onClick={() => handleNavBudget(id)}
          className="rounded p-3 border bg-green-300 mt-5 uppercase font-semibold w-full sm:w-20 hover:opacity-80"
        >
          View
        </button>
        <button className="rounded p-3 border bg-red-300 mt-5 uppercase font-semibold w-full sm:w-20 hover:opacity-80">
          Delete
        </button>
      </div>
    </div>
  );
}

BudgetCard.propTypes = {
  id: PropTypes.any.isRequired,
};
