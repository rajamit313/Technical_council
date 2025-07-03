import { dbConnect } from "@/lib/mongoose";
import User from "@/model/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SuperSecret";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim();

    await dbConnect();

    // Get the token from cookies
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const currentUserRollNo = decoded.rollNo;

    let results = [];

    if (!query) {
      // If no search, return all users except current
      results = await User.find({ rollNo: { $ne: currentUserRollNo } })
        .select("name rollNo department batchYear bio");
      return NextResponse.json({ success: true, results });
    }

    const regex = new RegExp(query, "i");
    const isNumeric = /^\d+$/.test(query);

    const conditions = [
      { name: regex },
      { department: regex }
    ];
    if (isNumeric) {
      conditions.push({ rollNo: Number(query) });
    }

    results = await User.find({
      $and: [
        { rollNo: { $ne: currentUserRollNo } }, // exclude current user
        { $or: conditions }
      ]
    }).select("name rollNo department batchYear bio");

    return NextResponse.json({ success: true, results });

  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
