import { Typography } from "./typography";
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
      <main className="h-full px-20 py-10">{children}</main>
    </body>
  ),
  Content: ({ children, className, title, ...props }: { title: string } & React.ComponentPropsWithoutRef<"div">) => (
    <div className="flex flex-col gap-10" {...props}>
      <Typography.h1 className="text-center">{title}</Typography.h1>
      <div className={className}>{children}</div>
    </div>
  ),
};
