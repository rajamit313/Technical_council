"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [bio, setBio] = useState('');
  const [department, setDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setName(data.name);
        setBatchYear(data.batchYear);
        setBio(data.bio);
        setDepartment(data.department);
        setRollNo(data.rollNo);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      router.push("/login");
    }
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/search?query=${searchQuery.trim()}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    handleSearch(); // Fetch all users by default on page load
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

      {/* Profile Card */}
      <div className="bg-white/5 p-6 rounded-xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-bold text-indigo-300 mb-2">Profile</h2>
        <p className="mb-1"><span className="font-semibold">Name:</span> {name}</p>
        <p className="mb-1"><span className="font-semibold">Roll No:</span> {rollNo}</p>
        <p className="mb-1"><span className="font-semibold">Department:</span> {department}</p>
        <p className="mb-1"><span className="font-semibold">Batch Year:</span> {batchYear}</p>
        <p className="mb-3"><span className="font-semibold">Bio:</span> {bio || "No bio added yet."}</p>
        <button
          onClick={() => router.push("/user/profile")}
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
        >
          Edit Profile
        </button>
      </div>

      {/* Search Card */}
      <div className="bg-white/5 p-6 rounded-xl shadow-lg border border-white/10 col-span-1 md:col-span-2">
        <h2 className="text-2xl font-bold text-indigo-300 mb-4">Search People</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter name, roll number or department"
            className="flex-1 px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        {results.length > 0 && (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {results.map((r, idx) => (
              <li key={idx} className="p-4 bg-white/10 rounded-md text-sm text-white border border-white/20">
                <p><strong>Name:</strong> {r.name}</p>
                <p><strong>Roll No:</strong> {r.rollNo}</p>
                <p><strong>Department:</strong> {r.department}</p>
                <p><strong>Batch Year:</strong> {r.batchYear}</p>
                <p><strong>Bio:</strong> {r.bio || ""}</p>
              </li>
            ))}
          </ul>
        )}
        {results.length === 0 && searchQuery && (
          <p className="text-gray-400">No results found.</p>
        )}
      </div>

    </main>
  );
}
