"use client";

import { AgGrid } from "@/components/ag-grid";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-8">
        <Typography.h1 className="text-center">Connectory</Typography.h1>
        <div className="flex flex-col gap-4">
          <Button className="ml-auto">Add Entry</Button>
          <AgGrid />
        </div>
      </div>
    </main>
  );
}
