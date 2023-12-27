import React, { useEffect } from "react";
import { format } from 'date-fns';

// ... (other imports and code)

const IncomeTable = ({ incomeData, onIncomeDeleted ,onDelRefreshChart}) => {
  useEffect(() => {
    console.log("income data for the table is...", incomeData);
  }, [incomeData]);

  const handleDeleteClick = async (id) => {
    console.log("delete button hit, id is...", id);
    try {
      const response = await fetch(`/api/income/delete?id=${id}`, {
        method: "DELETE", // Change to DELETE
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Income with ID ${id} deleted successfully.`, data);

        onIncomeDeleted();
        onDelRefreshChart();
      } else {
        const errorData = await response.json();
        console.error(`Income deletion failed for ID ${id}:`, errorData);
        // You can handle the error as needed
      }
    } catch (error) {
      console.error(`Error during income deletion for ID ${id}:`, error);
      // You can handle the error as needed
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Income Table</h2>
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
            {incomeData?.map((item) => (
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

export default IncomeTable;
