import { Layout } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit | Connectory",
  description: "Edit a contact or company",
};

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout.Content title="Edit connection">{children}</Layout.Content>;
}
