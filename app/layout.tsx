import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = localFont({
  src: "../public/fonts/DMSans.ttf",
  variable: "--font-body",
  display: "swap",
});

const pixelifySans = localFont({
  src: "../public/fonts/PixelifySans.ttf",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jimoh AbdulRasheed — Developer & Designer",
  description:
    "I’m Jimoh AbdulRasheed, an independent developer and designer who likes figuring things out by building, breaking, and trying again.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${dmSans.variable} ${pixelifySans.variable}`}>
        {children}
      </body>
    </html>
  );
}
