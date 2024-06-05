import { Layout } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | Connectory",
  description: "Create a new contact or company to stay connected with.",
};

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout.Content title="Create">{children}</Layout.Content>;
}
