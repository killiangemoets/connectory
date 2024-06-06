import { Layout } from "@/components/layout";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout.Content className="flex flex-col gap-2" title="Connections">
      {children}
    </Layout.Content>
  );
}
