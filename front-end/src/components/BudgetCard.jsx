import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function BudgetCard({ id }) {
  const [budgetData, setBudgetData] = useState(null);
  console.log(budgetData);
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
    return <div className="m-14 font-bold text-2xl">Loading data...</div>;
  }

  //   if (budgetData === budgetData.length === 0 || Object.keys(budgetData).length === 0) {
  //     return <div></div>
  //   }

  return (
    <div className="flex flex-col border rounded-lg">
      <h1 className="me-auto">
        Budget: {budgetData.month} {budgetData.year}
      </h1>
    </div>
  );
}

BudgetCard.propTypes = {
  id: PropTypes.any.isRequired,
};
