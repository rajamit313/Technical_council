"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return ( 
    <main className="min-h-screen px-6 py-10 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight mb-4">
        Welcome to <span className="text-blue-600">Co<span className="text-yellow-500">N</span>ectiv<span className="text-yellow-500">I</span><span className="text-yellow-500">T</span><span className="text-yellow-500">T</span>y</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
        A dedicated platform for NIT Trichy students and alumni to showcase skills, build professional profiles, and connect through shared interests and expertise.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link href="/signup">
          <button className="flex items-center px-6 py-3 text-lg shadow-md bg-blue-600 border-white border hover:bg-blue-700 text-white rounded-md">
            <span className="mr-2">👤</span> Join Now
          </button>
        </Link>

        <Link href="/login">
          <button className="flex items-center px-6 py-3 text-lg shadow-md border bg-blue-600 border-gray-300 hover:bg-blue-700 rounded-md">
            <span className="mr-2">🔑</span> Log In
          </button>
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl w-full">
        <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Showcase Your Skills</h3>
          <p className="text-gray-600">Highlight your talents, certifications, and projects in your profile to stand out among peers and alumni.</p>
        </div>
        <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Connect with Alumni</h3>
          <p className="text-gray-600">Reach out to successful NITT alumni in your field of interest and grow your network meaningfully.</p>
        </div>
        <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Collaborate & Grow</h3>
          <p className="text-gray-600">Find collaborators for ideas, projects, and startups based on shared interests and complementary skills.</p>
        </div>
      </section>

      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} CoNectivITTy. Built with ❤️ by NIT Trichy students.
      </footer>
    </main>
  );
}
