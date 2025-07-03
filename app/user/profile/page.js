"use client";

import React, { useEffect, useState } from 'react';
import Toast from '@/app/component/Toast/page';
import { toast, Bounce } from 'react-toastify';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [bio, setBio] = useState('');

  const findData = async () => {
    const res = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (data.success) {
      setName(data.name);
      setDepartment(data.department);
      setBatchYear(data.batchYear);
      setBio(data.bio || '');
    }
  };

  useEffect(() => {
    findData();
  }, []);

  const saveHandler = async () => {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio }),
    });

    const data = await res.json();
    if (data.success) {
      toast(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    findData();
  };

  return (
    <>
      <Toast />
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-6 py-12 text-white">
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-indigo-200 mb-1">Name</label>
              <input
                type="text"
                value={name}
                readOnly
                className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-200 mb-1">Department</label>
              <input
                type="text"
                value={department}
                readOnly
                className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-200 mb-1">Batch Year</label>
              <input
                type="number"
                value={batchYear}
                readOnly
                className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-200 mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write something about yourself..."
                className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md resize-none"
                rows={4}
              />
            </div>

            <div className="text-center mt-6">
              <button
                onClick={saveHandler}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Save Bio
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
