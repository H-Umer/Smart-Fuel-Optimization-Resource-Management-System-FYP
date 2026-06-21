import Link from 'next/link';

export default function Home() {
  return (
    <section className="container py-16">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            Smart Fuel Optimization
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Plan trips, track fuel, and manage budgets with intelligence.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-700">
            Built for individuals and small organizations, this resource management system helps you control fuel costs,
            avoid waste, and stay ready during crisis conditions.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/register" className="rounded bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800">
              Create account
            </Link>
            <Link href="/dashboard" className="rounded border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              View dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">What this platform delivers</h2>
          <ul className="mt-6 space-y-4 text-slate-200">
            <li>• Vehicle management with fuel efficiency and capacity</li>
            <li>• Purchase tracking and cost analytics</li>
            <li>• Trip planning with estimated fuel consumption</li>
            <li>• Crisis mode recommendations for scarce conditions</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
