"use client";

import { AgGrid } from "@/components/ag-grid";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { GET_ENTITIES } from "@/graphql/entities";
import type { GetEntitiesQuery } from "@/utils/gql/graphql";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { loading, error, data } = useQuery<GetEntitiesQuery>(GET_ENTITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const entities = data?.getEntities;
  if (!entities || entities?.length === 0) return <p>No data</p>;

  // const columns = Object.keys(entities[0]).map((key) => ({ field: key }));
  const columns = [
    { field: "__typename" },
    { field: "id" },
    { field: "name" },
    { field: "industry" },
    { field: "phone" },
    { field: "email" },
    { field: "contactEmail" },
  ];

  return (
    <main>
      <div className="flex flex-col gap-8">
        <Typography.h1 className="text-center">Connectory</Typography.h1>
        <div className="flex flex-col gap-4">
          <Button className="ml-auto">Add Entry</Button>
          <AgGrid data={entities} columns={columns} />
        </div>
      </div>
    </main>
  );
}
