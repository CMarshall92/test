import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Crosspost.co.uk',
  description: 'Simplify your inventory and let us crosspost and manage the sale across all the most popular ecommerce platforms out there'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><SessionProvider>{children}</SessionProvider></body>
      <Analytics />
    </html>
  );
}
