// @api/auth/login/route.js
import User from "@models/User";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  console.log("route hit login");
  if (req.method === "POST") {
    const { email, password } = await req.json();

    try {
      await connectToDB();

      // Check if the user exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Check if the password is correct
      if (existingUser.password !== password) {
        return new Response(JSON.stringify({ error: "Invalid password" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({
          message: "Login successful",
          user: {
            id: existingUser._id,
            username: existingUser.username,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
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
