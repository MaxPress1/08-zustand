import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const robotoFont = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "Simple and efficient application designed for managing personal notes",
  openGraph: {
    title: "NoteHub",
    description:
      "Simple and efficient application designed for managing personal notes",
    url: `https://07-routing-nextjs-ochre.vercel.app/`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description:
      "Simple and efficient application designed for managing personal notes",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFont.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children} {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
