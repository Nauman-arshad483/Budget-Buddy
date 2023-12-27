import React, { useState, useEffect } from "react";

const ExpenseForm = ({onExpenseAdded}) => {
  const [showForm, setShowForm] = useState(false);
  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    date: "",
    paymentMethod: "cash", // Default to 'cash', you can adjust as needed
    description: "",
  });
  const [errors, setErrors] = useState({
    category: "",
    amount: "",
    date: "",
    paymentMethod: "",
    description: "",
  });

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      category: "",
      amount: "",
      date: "",
      paymentMethod: "",
      description: "",
    };
    // Validate category
    if (!expenseData.category.trim()) {
      newErrors.category = "Category is required";
      valid = false;
    }

    // Validate amount
    if (parseFloat(expenseData.amount) < 0) {
      newErrors.amount = "Amount cannot be negative";
      valid = false;
    }
    if (parseFloat(expenseData.amount) === 0) {
      newErrors.amount = "Amount cannot be zero";
      valid = false;
    }

    // Validate date
    if (!expenseData.date.trim()) {
      newErrors.date = "Date is required";
      valid = false;
    }
    if (!expenseData.paymentMethod.trim()) {
      newErrors.paymentMethod = "Payment method is required";
      valid = false;
    }

    // Validate description (optional)
    if (expenseData.description.trim().length > 255) {
      newErrors.description = "Description should not exceed 255 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      // If form is not valid, don't proceed with the submission
      return;
    }

    try {
      const response = await fetch("/api/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Expense submitted successfully:", data);
        onExpenseAdded();
      } else {
        const errorData = await response.json();
        console.error("Expense submission failed:", errorData);
        // You can handle the error as needed
      }
    } catch (error) {
      console.error("Error during expense submission:", error);
      // You can handle the error as needed
    }
  };

  useEffect(() => {
    // Extract userID from local storage and update the state
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      setExpenseData((prevData) => ({
        ...prevData,
        userID: storedUserID,
      }));
    }
  }, []); // Run this effect only once on component mount

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mt-4 ">
      <button
        className="bg-primary-color text-white px-4 py-2 rounded-md mr-2"
        onClick={handleAddClick}
      >
        {showForm ? "Hide Form" : "Add +"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.category}</span>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              className="w-full p-2 border rounded-md"
              name="category"
              value={expenseData.category}
              onChange={handleChange}
            >
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.amount}</span>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.date}</span>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              name="date"
              value={expenseData.date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.paymentMethod}</span>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Payment Method
            </label>
            <select
              className="w-full p-2 border rounded-md"
              name="paymentMethod"
              value={expenseData.paymentMethod}
              onChange={handleChange}
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              {/* Add more payment methods as needed */}
            </select>
          </div>

          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.description}</span>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary-color text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
