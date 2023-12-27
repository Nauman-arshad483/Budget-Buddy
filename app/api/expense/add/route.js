import Expense from "@models/Expense";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  console.log("Route hit expense");
  if (req.method === "POST") {
    const {
      userID, // Include userID in the request body
      category,
      amount,
      date,
      paymentMethod,
      description,
    } = await req.json();

    try {
      await connectToDB();

      // Create a new expense record
      const newExpense = new Expense({
        userID,
        category,
        amount,
        date,
        paymentMethod,
        description,
      });
      await newExpense.save();

      return new Response(
        JSON.stringify({ message: "Expense submitted successfully" }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  return new Response(
    JSON.stringify({ message: "Method not allowed" }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
};
