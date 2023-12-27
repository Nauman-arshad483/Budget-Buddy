import User from "@models/User";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  console.log("route hit sign up");
  if (req.method === "POST") {
    const { username, email, password } = await req.json();

    try {
      await connectToDB();
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(JSON.stringify({ error: "User with this email already exists" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();

      return new Response(JSON.stringify({ message: "User registered successfully" }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
   
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};
