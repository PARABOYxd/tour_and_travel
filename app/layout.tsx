import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { siteConfig } from '@/lib/site-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: `${siteConfig.name} - Premier Tour & Travel Agency in India`,
    template: `%s | ${siteConfig.name}`
  },
  description: 'Book unforgettable Indian tour packages including Himachal, Kerala, Rajasthan, and more with Meet X World Tours. Best price guarantee and 24/7 support.',
  keywords: ['tour packages', 'travel agency', 'India tourism', 'Himachal tours', 'Kerala honeymoon packages', 'Rajasthan travel', 'holiday packages', 'Meet X World Tours'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://meetxworldtours.com',
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
