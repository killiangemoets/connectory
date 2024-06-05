import { Typography } from "./typography";
import { cn } from "@/lib/utils";

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-16 bg-blue-200 w-full h-16 px-4 ", className)}>
      <Typography.h4>Connectory</Typography.h4>
    </div>
  );
};

export const Layout = ({ children, className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div className={cn("", className)} {...props}>
    <Navbar />
    <main className="h-full relative px-20">{children}</main>
  </div>
);
