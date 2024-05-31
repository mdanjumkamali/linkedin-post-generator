import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkedIn Post Generator",
  description: "Boost your LinkedIn presence with our Post Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <meta property="og:title" content="LinkedIn Post Generator" />
        <meta
          property="og:description"
          content="Boost your LinkedIn presence with our Post Generator"
        />
        <meta property="og:image" content="/icon.png" />
        <meta
          property="og:url"
          content="https://linkedinpostgenerator.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LinkedIn Post Generator" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LinkedIn Post Generator" />
        <meta
          name="twitter:description"
          content="Boost your LinkedIn presence with our Post Generator"
        />
        <meta name="twitter:image" content="/icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
