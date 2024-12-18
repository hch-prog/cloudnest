import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cloudnest-drive.vercel.app'),
  title: "CloudNest - A google drive insipred clone",
  description: "Experience lightning-fast uploads. CloudNest is your next-generation file management solution, where you can store and share files with ease.",
  keywords: ["file management", "cloud storage", "secure storage", "file sharing"],
  authors: [{ name: "CloudNest Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudnest-drive.vercel.app",
    siteName: "CloudNest",
    title: "CloudNest - A google drive insipred clone",
    description: "Experience lightning-fast uploads. CloudNest is your next-generation file management solution, where you can store and share files with ease.",
    images: [
      {
        url: "https://cloudnest-drive.vercel.app/cloudnest.png",
        width: 1200,
        height: 630,
        alt: "CloudNest Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudNest - A google drive insipred clone",
    description: "Experience lightning-fast uploads. CloudNest is your next-generation file management solution, where you can store and share files with ease.",
    images: ["https://cloudnest-drive.vercel.app/cloudnest.png"],
    creator: "@cloudnest",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
