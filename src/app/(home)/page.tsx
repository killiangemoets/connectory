"use client";

import ConnectionsGrid from "./connections-grid";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Button className="ml-auto" href="/create">
        Add Connection
      </Button>
      <ConnectionsGrid />
    </>
  );
}
