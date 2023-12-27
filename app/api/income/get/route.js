import Income from "@models/Income";
import { connectToDB } from "@utils/database";
import { parseISO, startOfMonth, endOfMonth } from "date-fns";

export const POST = async (req, res) => {
  console.log("Route hit get income");
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { userID, startDate, income } = await req.json();

    console.log("Logs from the income route...");
    console.log("Start date is..", startDate);
    console.log("Income value is...", income);
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

    let userIncomeData;

    if (income ) {
      // If 'income' is true, fetch all records for the specified userID
      userIncomeData = await Income.find({ userID });
    } else {
      // Otherwise, fetch records within the specified date range
      userIncomeData = await Income.find({
        userID,
        date: {
          $gte: startOfMonthDate.toISOString(),
          $lt: endOfMonthDate.toISOString(),
        },
      });
    }

    return new Response(JSON.stringify(userIncomeData), {
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
