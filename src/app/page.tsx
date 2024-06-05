"use client";

import { AgGrid } from "@/components/ag-grid";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";

type RowData = {
  make: string;
  model: string;
  price: number;
  electric: boolean;
};

type ColDef = {
  field: keyof RowData;
};

const data: RowData[] = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  { make: "Mercedes", model: "EQA", price: 48890, electric: true },
  { make: "Fiat", model: "500", price: 15774, electric: false },
  { make: "Nissan", model: "Juke", price: 20675, electric: false },
];

const columns: ColDef[] = [{ field: "make" }, { field: "model" }, { field: "price" }, { field: "electric" }];

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-8">
        <Typography.h1 className="text-center">Connectory</Typography.h1>
        <div className="flex flex-col gap-4">
          <Button className="ml-auto">Add Entry</Button>
          <AgGrid data={data} columns={columns} />
        </div>
      </div>
    </main>
  );
}
