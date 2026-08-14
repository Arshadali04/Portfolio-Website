import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arshadali M Athani — Data Engineer",
  description:
    "Full-stack data engineer and computer science undergraduate building data pipelines, APIs, and ML-powered systems. Based in Bengaluru, India.",
  keywords: [
    "Arshadali Athani",
    "Data Engineer",
    "Python",
    "FastAPI",
    "SQL",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Arshadali M Athani" }],
  openGraph: {
    type: "website",
    title: "Arshadali M Athani — Data Engineer",
    description:
      "Building data pipelines, APIs, and ML-powered systems. CS undergraduate at RVITM Bengaluru.",
    siteName: "Arshadali M Athani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshadali M Athani — Data Engineer",
    description: "Building data pipelines, APIs, and ML-powered systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} h-full`}
    >
      <body className="min-h-full bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
