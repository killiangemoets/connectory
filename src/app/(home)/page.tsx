"use client";

import { AgGrid } from "@/components/ag-grid";
import { Button } from "@/components/ui/button";
import { GET_ENTITIES } from "@/graphql/entities";
import type { GetEntitiesQuery } from "@/utils/gql/graphql";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { loading, error, data: getEntitiesQuery } = useQuery<GetEntitiesQuery>(GET_ENTITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const entities = getEntitiesQuery?.getEntities;
  if (!entities || entities?.length === 0) return <p>No data</p>;

  // console.log(entities);
  // const columns = Object.keys(entities[0]).map((key) => ({ field: key }));

  const columns = [
    { field: "__typename", headerName: "Type" },
    { field: "name" },
    { field: "industry" },
    { field: "phone" },
    { field: "email" },
    { field: "contactEmail" },
  ];

  return (
    <>
      <Button className="ml-auto" href="/create">
        Add Entry
      </Button>
      <AgGrid data={entities} columns={columns} />
    </>
  );
}
