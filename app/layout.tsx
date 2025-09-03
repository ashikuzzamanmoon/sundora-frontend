import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar/Navbar'; 
import Footer from '@/components/layout/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sundora - Your True Experience',
  description: 'A frontend project of Sundora website.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Add Navbar here */}
        <main className="min-h-screen">
          {children}
        </main>
        <Footer /> {/* Add Footer here */}
      </body>
    </html>
  );
}