export const addExpenseItem = async (name, value, budgetId, categoryId) => {
  const res = await fetch("/api/app/add-expense-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, value, budgetId, categoryId }),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    console.error("There was an error adding the item. " + errorData.error);
    return errorData;
  }
};

export const deleteExpenseItem = async (itemId) => {
  const res = await fetch(`/api/app/delete-expense-item?id=${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    console.error("There was an error deleting the item. " + errorData.error);
    return errorData;
  }
};

export const addIncomeItem = async (name, value, budgetId, categoryId) => {
  const res = await fetch("/api/app/add-income-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, value, budgetId, categoryId }),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    console.error("There was an error adding the item. " + errorData.error);
    return errorData;
  }
};

export const deleteIncomeItem = async (itemId) => {
  const res = await fetch(`/api/app/delete-income-item?id=${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    console.error("There was an error deleting the item. " + errorData.error);
    return errorData;
  }
};
