import { cn } from "@/lib/utils";

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-16 bg-primary w-full h-16 px-4 ", className)}>
      <h4 className="text-heading-4 text-secondary italic tracking-wide">Connectory</h4>
    </div>
  );
};

export const Layout = {
  Body: ({ children, className, ...props }: React.ComponentPropsWithoutRef<"body">) => (
    <body className={cn("min-h-screen bg-primary/10", className)} {...props}>
      <Navbar />
      <main className="h-full px-20 py-16">{children}</main>
    </body>
  ),
};
