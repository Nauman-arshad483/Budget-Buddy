import Income from "@models/Income";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  console.log("route hit income");
  if (req.method === "POST") {
    const {
      userID, // Include userID in the request body
      source,
      amount,
      date,
      paymentMethod,
      description,
    } = await req.json();

    try {
      await connectToDB();

      // Create a new income record
      const newIncome = new Income({
        userID,
        source,
        amount,
        date,
        paymentMethod,
        description,
      });
      await newIncome.save();

      return new Response(
        JSON.stringify({ message: "Income submitted successfully" }),
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
