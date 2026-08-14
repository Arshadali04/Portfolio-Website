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
  title: "Arshadali M Athani — Data Engineer & Software Developer",
  description:
    "Data engineer and software developer building data pipelines, APIs, and ML-powered systems. CS undergraduate at RVITM Bengaluru, India.",
  keywords: [
    "Arshadali Athani",
    "Data Engineer",
    "Software Developer",
    "Python",
    "FastAPI",
    "SQL",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Arshadali M Athani" }],
  metadataBase: new URL("https://arshadali.netlify.app"),
  openGraph: {
    type: "website",
    url: "https://arshadali.netlify.app",
    title: "Arshadali M Athani — Data Engineer & Software Developer",
    description:
      "Building data pipelines, APIs, and ML-powered systems. CS undergraduate at RVITM Bengaluru.",
    siteName: "Arshadali M Athani Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Arshadali M Athani — Data Engineer & Software Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshadali M Athani — Data Engineer & Software Developer",
    description: "Building data pipelines, APIs, and ML-powered systems.",
    images: ["/og-image.png"],
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
      <body className="min-h-full bg-bg text-fg antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
