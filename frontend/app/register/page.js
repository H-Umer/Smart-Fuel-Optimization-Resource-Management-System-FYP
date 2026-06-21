'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', form);
      localStorage.setItem('smartFuelToken', response.data.token);
      localStorage.setItem('smartFuelUser', JSON.stringify(response.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-900">Register</h1>
        <p className="mt-2 text-slate-600">Create an account to start tracking fuel consumption.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input name="name" type="text" value={form.name} onChange={handleChange} required className="mt-2 w-full" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-2 w-full" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="mt-2 w-full" />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="w-full rounded bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link href="/login" className="font-semibold text-slate-900 underline">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
