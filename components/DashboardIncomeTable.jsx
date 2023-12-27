import React from "react";
import { format } from "date-fns";

const DashboardIncomeTable = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Income Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Income Description
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(entry.date), "yyyy-MM-dd")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entry.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardIncomeTable;
