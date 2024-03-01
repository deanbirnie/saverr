import React, { useEffect, useState } from "react";
import BudgetCard from "../components/BudgetCard";
import Footer from "../components/Footer";
import NewBudgetModal from "../components/NewBudgetModal";

export default function AppPage() {
  const [budgets, setBudgets] = useState(null);
  const [showNewBudgetModal, setShowNewBudgetModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/app/find-budgets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          if (data) {
            setBudgets(data);
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const handleAddBudget = () => {
    setShowNewBudgetModal(true);
  };

  const handleModalClose = () => {
    setShowNewBudgetModal(false);
    window.location.reload(false);
  };

  if (!budgets || !budgets.length || budgets === null) {
    return <div className="m-14 font-bold text-2xl">Loading data...</div>;
  }

  return (
    <div className="mx-auto text-center min-h-screen mt-10">
      {showNewBudgetModal && <NewBudgetModal onClose={handleModalClose} />}
      <div className="mx-auto max-w-screen-2xl p-4 flex items-center justify-between">
        <h1>Select Your budget</h1>
        {!showNewBudgetModal && (
          <button
            className="uppercase rounded-lg p-3 bg-green-200 border font-semibold hover:opacity-80"
            onClick={handleAddBudget}
          >
            New Budget
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-screen-2xl max-h-5 mx-auto pb-16">
        {budgets.map((budget) => {
          console.log(budget.id);
          return (
            <div key={budget.id} className="flex-shrink-0 w-full">
              <BudgetCard budget={budget} id={budget.id} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
