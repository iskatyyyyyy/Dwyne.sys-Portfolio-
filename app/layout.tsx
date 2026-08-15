import type { Metadata } from "next";
import { JetBrains_Mono, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-roboto",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Kernel Aesthetic - Portfolio",
  description:
    "Architecting secure, high-performance backend logic. Focused on system architecture, deep technical problem-solving, and building resilient infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${jetbrains.variable}`}>
      <body className="font-roboto antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
