import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import BudgetRemainingCard from "../components/BudgetRemainingCard";
import AddCategoryModal from "../components/AddCategoryModal";
import Footer from "../components/Footer";

export default function BudgetPage() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const cardCount = 5;
  const cardNumbers = Array.from({ length: cardCount }, (_, index) => index);

  useEffect(() => {
    const fetchBudgetData = () => {
      setIncome(0);
      setExpenses(0);
    };
    fetchBudgetData();
  }, []);

  const handleModalClose = () => {
    setShowAddCatModal(false);
    setShowFloatingButtons(true);
  };

  return (
    <div className="grid grid-cols-1 gap-10 max-w-screen-2xl max-h-5 mx-auto pb-16">
      {showAddCatModal && <AddCategoryModal onClose={handleModalClose} />}
      <BudgetRemainingCard income={income || 0} expenses={expenses || 0} />
      {cardNumbers.map((cardNumber) => (
        <CategoryCard key={cardNumber} cardNumber={cardNumber} />
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
      <Footer />
    </div>
  );
}
