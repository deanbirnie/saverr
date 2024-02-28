import React from "react";
import CategoryCard from "../components/CategoryCard";

export default function AppPage() {
  const cardCount = 5;
  const cardNumbers = Array.from({ length: cardCount }, (_, index) => index);

  return (
    <div className="flex flex-col items-center m-10 max-w-5xl">
      {cardNumbers.map((cardNumber) => (
        <CategoryCard key={cardNumber} cardNumber={cardNumber} />
      ))}
    </div>
  );
}
