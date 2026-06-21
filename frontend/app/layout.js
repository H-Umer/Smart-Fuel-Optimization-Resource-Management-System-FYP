import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Fuel Optimization',
  description: 'Manage fuel consumption, trips, budgets, and crises in one dashboard.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-slate-50 text-slate-900">{children}</main>
      </body>
    </html>
  );
}
