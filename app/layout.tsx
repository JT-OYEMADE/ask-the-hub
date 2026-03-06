import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toaster";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Ask The Hub — AI Research Intelligence",
  description:
    "Type any topic and get structured, expert-level research insights powered by AI. Free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      style={{ background: "#06060a" }}
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased">
        <ToastProvider>
          {children}
          <footer className="footer">
            <p>
              © 2026 Ask The Hub · Built by{" "}
              <a
                href="https://j-to.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Oluwatomisin
              </a>{" "}
              · Powered by Claude
            </p>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
