import User from "@/model/user";
import { dbConnect } from "@/lib/mongoose";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { rollNo, password } = await request.json();
    await dbConnect();

    const user = await User.findOne({ rollNo });
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: "User not found!" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ success: false, error: "Invalid password!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Login successful!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
