import React, { useState, useEffect } from "react";

const IncomeForm = ({ onIncomeAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [incomeData, setIncomeData] = useState({
    source: "",
    amount: "",
    date: "",
    paymentMethod: "cash",
    description: "",
  });

  const [errors, setErrors] = useState({
    source: "",
    amount: "",
    date: "",
    paymentMethod: "",
    description: "",
  });

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      setIncomeData((prevData) => ({
        ...prevData,
        userID: storedUserID,
      }));
    }
  }, []);

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      source: "",
      amount: "",
      date: "",
      paymentMethod: "",
      description: "",
    };

    // Validate source
    if (!incomeData.source.trim()) {
      newErrors.source = "Source is required";
      valid = false;
    }

    // Validate amount
    if (parseFloat(incomeData.amount) < 0) {
      newErrors.amount = "Amount cannot be negative";
      valid = false;
    }

    
    if (parseFloat(incomeData.amount) === 0) {
      newErrors.amount = "Amount cannot be zero";
      valid = false;
    }
    // Validate date
    if (!incomeData.date.trim()) {
      newErrors.date = "Date is required";
      valid = false;
    }

    // Validate payment method
    if (!incomeData.paymentMethod.trim()) {
      newErrors.paymentMethod = "Payment method is required";
      valid = false;
    }

    // Validate description (optional)
    if (incomeData.description.trim().length > 255) {
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
      const response = await fetch("/api/income/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Income submitted successfully:", data);
        onIncomeAdded();
      } else {
        const errorData = await response.json();
        console.error("Income submission failed:", errorData);
      }
    } catch (error) {
      console.error("Error during income submission:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncomeData((prevData) => ({
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
            <span className="text-sm text-red-500">{errors.source}</span>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Source
            </label>
            <select
              className="w-full p-2 border rounded-md"
              name="source"
              value={incomeData.source}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Income Source
              </option>
              <option value="salary">Salary</option>
              <option value="bonus">Bonus</option>
              {/* Add more source options as needed */}
            </select>
          </div>

          <div className="mb-4">
            <span className="text-sm text-red-500">{errors.amount}</span>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              name="amount"
              value={incomeData.amount}
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
              value={incomeData.date}
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
              value={incomeData.paymentMethod}
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
              value={incomeData.description}
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

export default IncomeForm;
