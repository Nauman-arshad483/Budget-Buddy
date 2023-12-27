import React, { useEffect } from "react";
import { format } from "date-fns";

const ExpenseTable = ({ expenseData, onExpenseDeleted ,onDelRefreshChart}) => {
  useEffect(() => {
    console.log("expense data for the table is...", expenseData);
  }, [expenseData]);

  const handleDeleteClick = async (id) => {
    console.log("delete button hit, id is...", id);
    try {
      const response = await fetch(`/api/expense/delete?id=${id}`, {
        method: "DELETE", // Change to DELETE
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Expense with ID ${id} deleted successfully.`, data);

        onExpenseDeleted();
        onDelRefreshChart();

      } else {
        const errorData = await response.json();
        console.error(`Expense deletion failed for ID ${id}:`, errorData);
        // You can handle the error as needed
      }
    } catch (error) {
      console.error(`Error during expense deletion for ID ${id}:`, error);
      // You can handle the error as needed
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expense Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Category</th>
              <th className="py-2 px-4 border-b text-center">Amount</th>
              <th className="py-2 px-4 border-b text-center">Date</th>
              <th className="py-2 px-4 border-b text-center">Payment Method</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenseData?.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b text-center">{item.id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.category}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.amount}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {" "}
                  {format(new Date(item.date), "yyyy-MM-dd")}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.paymentMethod}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-accent-color  text-white px-4 py-2 rounded-md"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
