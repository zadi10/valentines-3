import type { Metadata } from "next";
import { Dancing_Script, Inter } from "next/font/google"; // Import fonts
import "./globals.css";

// Configure fonts
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
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
        className={`${dancingScript.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
