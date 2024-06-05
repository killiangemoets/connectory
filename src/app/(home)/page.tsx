"use client";

import { Grid } from "@/components/grid";
import { Button } from "@/components/ui/button";
import { ENTITY_TYPES } from "@/constants/entity";
import { GET_ENTITIES, UPDATE_ENTITY } from "@/graphql/entities";
import type { Company, Contact, GetEntitiesQuery } from "@/utils/gql/graphql";
import type { NewValueParams } from "@ag-grid-community/core";
import { useMutation, useQuery } from "@apollo/client";
import { Pencil } from "lucide-react";
import { useState } from "react";

const ConnectionsGrid = ({ entries }: { entries: GetEntitiesQuery["getEntities"] }) => {
  const columns = [
    {
      headerName: "About",
      children: [
        {
          field: "__typename",
          headerName: "Type",
          // editable: true,
          // cellEditor: "agSelectCellEditor",
          // cellEditorParams: {
          //   values: ["Contact", "Company", "Other"],
          // },
        },
        {
          field: "name",
          filter: true,
          floatingFilter: true,
          editable: true,
        },
        { field: "industry", filter: true, floatingFilter: true },
      ],
    },
    {
      headerName: "Contact Info",
      children: [
        { field: "phone", filter: true, floatingFilter: true },
        { field: "email", filter: true, floatingFilter: true },
        { field: "contactEmail", filter: true, floatingFilter: true },
      ],
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ({ data }: { data: Contact | Company }) => (
        <Button href={`/edit/${data.id}`} variant="ghost" size="icon" className="hover:text-muted-foreground">
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const [rowData, setRowData] = useState<GetEntitiesQuery["getEntities"]>(JSON.parse(JSON.stringify(entries)));
  const [updateEntityMutation] = useMutation(UPDATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }],
    onCompleted: () => {
      // eslint-disable-next-line no-console
      console.log("Updated");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCellValueChanged = (event: NewValueParams) => {
    const updatedRowData = rowData?.map((row) => (row?.id === event.data.id ? { ...event.data } : row));
    updateEntityMutation({
      variables: {
        input: {
          id: event.data.id,
          name: event.data.name,
          email: event.data.email,
          phone: event.data.phone,
          industry: event.data.industry,
          contactEmail: event.data.contactEmail,
          entityType: event.data.__typename.toLowerCase() === "contact" ? ENTITY_TYPES.CONTACT : ENTITY_TYPES.COMPANY,
        },
      },
    });
    setRowData(updatedRowData);
  };

  return (
    <Grid
      data={rowData}
      columns={columns}
      onCellValueChanged={handleCellValueChanged}
      extra={
        <Button className="ml-auto" href="/create">
          Add Connection
        </Button>
      }
    />
  );
};

export default function Home() {
  const { loading, error, data: getEntitiesQuery } = useQuery<GetEntitiesQuery>(GET_ENTITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const entities = getEntitiesQuery?.getEntities;
  if (!entities || entities?.length === 0) return <p>No data</p>;

  return <ConnectionsGrid entries={entities} />;
}
