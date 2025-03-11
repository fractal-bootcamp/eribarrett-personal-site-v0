import "~/styles/globals.css";
import { ThemeProvider } from "~/context/ThemeContext";
import { GeistSans } from "geist/font/sans";
import { type Metadata, type Viewport } from "next";
import { TRPCReactProvider } from "~/trpc/react";

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
    <html lang="en" className={GeistSans.className}>
      <body suppressHydrationWarning={true}>
        <div className="bg-background text-foreground">
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
