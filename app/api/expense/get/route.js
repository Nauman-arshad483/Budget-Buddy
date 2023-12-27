import Expense from "@models/Expense";
import { connectToDB } from "@utils/database";
import { parseISO, startOfMonth, endOfMonth } from "date-fns";

export const POST = async (req, res) => {
  console.log("Route hit get expense");
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { userID, startDate, expense } = await req.json();

    console.log("Logs from the expense route...");
    console.log("Start date is..", startDate);
    console.log("Expense is...", expense);
    await connectToDB();

    let isoStartDate, startOfMonthDate, endOfMonthDate;

    if (startDate?.startDate && startDate?.endDate) {
      // Handling date range
      isoStartDate = parseISO(startDate.startDate);
      const isoEndDate = parseISO(startDate.endDate);

      startOfMonthDate = startOfMonth(isoStartDate);
      endOfMonthDate = endOfMonth(isoEndDate);
    } else {
      // Handling single date
      isoStartDate = parseISO(startDate);

      startOfMonthDate = startOfMonth(isoStartDate);
      endOfMonthDate = endOfMonth(isoStartDate);
    }

    let userExpenseData;

    if (expense) {
      // If 'expense' is true, fetch all records for the specified userID
      userExpenseData = await Expense.find({ userID });
    } else {
      // Otherwise, fetch records within the specified date range
      userExpenseData = await Expense.find({
        userID,
        date: {
          $gte: startOfMonthDate.toISOString(),
          $lt: endOfMonthDate.toISOString(),
        },
      });
    }

    return new Response(JSON.stringify(userExpenseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
