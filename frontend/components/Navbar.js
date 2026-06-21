'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem('smartFuelToken')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('smartFuelToken');
    localStorage.removeItem('smartFuelUser');
    window.location.href = '/';
  };

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          Smart Fuel
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          {loggedIn && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
