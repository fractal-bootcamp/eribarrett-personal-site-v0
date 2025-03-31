import "~/styles/globals.css";
import { ThemeProvider } from "~/context/ThemeContext";
import { Courier_Prime, Inter } from "next/font/google";
import { type Metadata, type Viewport } from "next";
import { TRPCReactProvider } from "~/trpc/react";

// Define the primary font - Inter is a modern, clean sans-serif similar to your CV styling
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

// Define the monospace font for technical elements
const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: "eri.dev",
  description: "Personal website of eri, developer & technician behind multimedia-artist erosika",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${courierPrime.variable}`}>
      <body suppressHydrationWarning={true}>
        <div className="bg-background text-foreground font-sans">
          <ThemeProvider>
            <TRPCReactProvider>
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
