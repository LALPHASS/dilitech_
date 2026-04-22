import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dilitech — Ordinateurs Premium au Mali",
  description:
    "Dilitech, votre partenaire informatique de confiance au Mali. Découvrez notre sélection premium d'ordinateurs HP, Lenovo et Mac avec un service après-vente d'exception.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${playfair.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
