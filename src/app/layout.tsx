import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SoundToggle from "@/components/SoundToggle";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1C1638",
};

export const metadata: Metadata = {
  title: "MindMirror - The experiment that knows you surprisingly well",
  description: "An interactive experiment using psychology and patterns. Can we tell something surprisingly accurate about you in 60 seconds?",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MindMirror",
  },
  openGraph: {
    title: "MindMirror - The experiment that knows you surprisingly well",
    description: "An interactive experiment using psychology and patterns.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindMirror - The experiment that knows you surprisingly well",
    description: "An interactive experiment using psychology and patterns.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-white font-inter">
        <SoundToggle />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
