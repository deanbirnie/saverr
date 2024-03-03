import React, { useEffect, useState } from "react";
import ExpenseCategoryCard from "../components/ExpenseCategoryCard";
import BudgetRemainingCard from "../components/BudgetRemainingCard";
import AddCategoryModal from "../components/AddCategoryModal";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import IncomeCategoryCard from "../components/IncomeCategoryCard";

export default function BudgetPage() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [budgetData, setBudgetData] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const { budgetId } = useParams();

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const res = await fetch(`/api/app/get-budget-info?id=${budgetId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setBudgetData(data);
            setExpenseCategories(data.expenseCategories);
            setIncomeCategories(data.income);
            // Callculate total income
            const totalIncome = data.income.reduce((acc, incomeCategory) => {
              const categoryTotal = incomeCategory.incomeItems
                .map((item) => item.value)
                .reduce((a, b) => a + b, 0);

              return acc + categoryTotal;
            }, 0);
            setIncome(totalIncome);

            // Calculate total expenses
            const totalExpenses = data.expenseCategories.reduce(
              (acc, expenseCategory) => {
                const categoryTotal = expenseCategory.expenseItems
                  .map((item) => item.value)
                  .reduce((a, b) => a + b, 0);

                return acc + categoryTotal;
              },
              0
            );

            setExpenses(totalExpenses);
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBudgetData();
  }, [budgetId]);

  const handleModalClose = () => {
    setShowAddCatModal(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-10 max-w-screen-2xl max-h-5 mx-auto pb-16">
        {showAddCatModal && <AddCategoryModal onClose={handleModalClose} />}
        <BudgetRemainingCard income={income} expenses={expenses} />
        {incomeCategories.map((incomeCategory) => (
          <IncomeCategoryCard
            key={incomeCategory.id}
            category={incomeCategory}
          />
        ))}
        {expenseCategories.map((expenseCategory) => (
          <ExpenseCategoryCard
            key={expenseCategory.id}
            category={expenseCategory}
          />
        ))}
        {showFloatingButtons && (
          <button
            className=" fixed bottom-16 right-10 2xl:right-56 uppercase p-3 bg-green-200 border rounded-lg font-semibold hover:opacity-80"
            onClick={() => {
              setShowAddCatModal(true);
              setShowFloatingButtons(false);
            }}
          >
            Add Category
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}
