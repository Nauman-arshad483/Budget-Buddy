import Expense from "@models/Expense";
import { connectToDB } from "@utils/database";

export const DELETE = async (req, res) => {
  console.log("delete route hitted");
  if (req.method === "DELETE") {
    const url = new URL(req.url);

    const id = url.searchParams.get("id");

    // const { id } = req.query;
    console.log("id is...", id);
    try {
      await connectToDB();

      // Use the provided ID to find and delete the expense record
      const deletedExpense = await Expense.findByIdAndDelete(id);

      if (!deletedExpense) {
        // If the expense record with the given ID is not found

        return new Response(
          JSON.stringify({ error: "Expense record not found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new Response(JSON.stringify(deletedExpense), {
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
  }

  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};
