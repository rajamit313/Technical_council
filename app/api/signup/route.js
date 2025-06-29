import User from "@/model/user";
import { dbConnect } from "@/lib/mongoose";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();

    const { name, rollNo, batchYear, department, password } = body;

    // Check if rollNo already exists
    const existingUser = await User.findOne({ rollNo });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, error: "Roll Number already used!" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      rollNo,
      batchYear,
      department,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(JSON.stringify({ success: true, message: "Signup successful" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
