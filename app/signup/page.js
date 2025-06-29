"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault(); // <-- this is critical to prevent page reload
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, rollNo, batchYear, department, password }),
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Signup successful!");
      router.push('/login')
    } else {
      alert("❌ Signup failed: " + result.error);
    }
  } catch (error) {
    alert("❌ Signup error: " + error.message);
  }
};


  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-xl shadow-md w-full max-w-md bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Batch Year (e.g. 2026)"
            value={batchYear}
            onChange={(e) => setBatchYear(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
} // ← This was missing too
