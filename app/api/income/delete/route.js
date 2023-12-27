import Income from "@models/Income";
import { connectToDB } from "@utils/database";

export const DELETE = async (req, res) => {
  console.log("delete route hitted");
  if (req.method === "DELETE") {
    const url = new URL(req.url);

    const id = url.searchParams.get("id");

    // const { id } = req.query;
    console.log("id iss...", id);
    try {
      await connectToDB();

      // Use the provided ID to find and delete the income record
      const deletedIncome = await Income.findByIdAndDelete(id);

      if (!deletedIncome) {
        // If the income record with the given ID is not found

        return new Response(
          JSON.stringify({ error: "Income record not found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new Response(JSON.stringify(deletedIncome), {
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
