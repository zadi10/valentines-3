import type { Metadata } from "next";
import { Great_Vibes, Inter } from "next/font/google"; // Import fonts
import "./globals.css";

// Configure fonts
const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentine's Proposal",
  description: "Will you be my Valentine?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
