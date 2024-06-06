import "./globals.css";
import { Layout } from "@/components/layout";
import ApolloClientProvider from "@/contexts/apollo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connectory | Stay Connected!",
  description: "Directory of contacts and companies to stay connected with",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloClientProvider>
        <Layout.Body className={inter.className}>
          {children}
          <Toaster position="bottom-right" containerClassName="text-lg font-normal" />
        </Layout.Body>
      </ApolloClientProvider>
    </html>
  );
}
