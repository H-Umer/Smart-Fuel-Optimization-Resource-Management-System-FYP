'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fuelData, setFuelData] = useState(null);
  const [budget, setBudget] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('smartFuelToken');
    if (!token) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('smartFuelUser') || 'null');
    setUser(userData);

    const loadData = async () => {
      try {
        const [fuelRes, budgetRes, tripsRes] = await Promise.all([
          api.get('/fuel'),
          api.get('/budget'),
          api.get('/trips'),
        ]);
        setFuelData(fuelRes.data.totals);
        setBudget(budgetRes.data);
        setTrips(tripsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) {
    return <p className="container py-16 text-slate-700">Loading dashboard...</p>;
  }

  return (
    <section className="container py-16">
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-900">Welcome back, {user?.name || 'User'}</h1>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            Current budget alert: {budget?.alert ? 'Exceeded' : 'Within limit'}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Fuel spent this month</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">₹ {fuelData?.cost?.toFixed(2) ?? '0.00'}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Liters purchased</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{fuelData?.quantity?.toFixed(2) ?? '0.00'} L</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Monthly budget</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">₹ {budget?.budget?.monthlyLimit?.toFixed(2) ?? '0.00'}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent trips</h2>
            <div className="mt-4 space-y-4">
              {trips.length === 0 ? (
                <p className="text-sm text-slate-600">No trips planned yet.</p>
              ) : (
                trips.slice(0, 4).map((trip) => (
                  <div key={trip._id} className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="font-semibold text-slate-900">{trip.origin} → {trip.destination}</p>
                    <p className="mt-1 text-sm text-slate-600">Distance: {trip.distanceKm} km • Fuel: {trip.estimatedFuelLiters} L</p>
                    <p className="mt-2 text-sm text-slate-500">{trip.recommendedRoute}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Crisis mode focus</h2>
            <p className="mt-4 text-slate-700">
              During shortages, prioritize essential journeys, consolidate errands, and avoid stop-and-go traffic. Review
              your routes to keep fuel expenses under the monthly budget.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>• Combine short trips into single runs.</p>
              <p>• Avoid non-essential travel and optimize route choices.</p>
              <p>• Monitor spend, especially when the budget alert is active.</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
