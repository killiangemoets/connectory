"use client";

import { Typography } from "@/components/typography";
import { AgGrid } from "@/components/ui/ag-grid";
import { Button } from "@/components/ui/button";
import { ENTITY_TYPES } from "@/constants/entity";
import { GET_ENTITIES, UPDATE_ENTITY } from "@/graphql/entities";
import type { Entity } from "@/types/entity";
import type { Company, Contact, GetEntitiesQuery } from "@/types/generated/graphql";
import type { ColGroupDef, NewValueParams } from "@ag-grid-community/core";
import { useMutation, useQuery } from "@apollo/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const columns: ColGroupDef<Entity>[] = [
  {
    headerName: "About",
    children: [
      {
        field: "__typename",
        headerName: "Type",
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
      {
        headerName: "(Contact) Email",
        filter: true,
        floatingFilter: true,
        valueGetter: (params) => {
          if (params.data?.__typename === "Contact") return params.data.email;
          if (params.data?.__typename === "Company") return params.data.contactEmail;
          return null;
        },
      },
    ],
  },
  {
    children: [
      {
        headerName: "Actions",
        sortable: false,
        cellRenderer: ({ data }: { data: Contact | Company }) => (
          <Button href={`/edit/${data.id}`} variant="ghost" size="icon" className="hover:text-muted-foreground">
            <Pencil className="h-4 w-4" />
          </Button>
        ),
      },
    ],
  },
];

const EntitiesGrid = ({ entities }: { entities: Entity[] }) => {
  // Deep copy the entities to avoid mutating the original data
  const [rowData, setRowData] = useState<Entity[]>(JSON.parse(JSON.stringify(entities)));

  const [updateEntityMutation] = useMutation(UPDATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }],
    onCompleted: () => {
      toast.success("Connection updated!", {
        duration: 5000,
        style: {
          fontWeight: 600,
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCellValueChanged = (event: NewValueParams<Entity>) => {
    const updatedRowData: Entity[] = rowData?.map((row) => (row?.id === event.data?.id ? { ...event.data } : row));
    updateEntityMutation({
      variables: {
        input: {
          id: event.data?.id,
          name: event.data?.name,
          entityType: event.data?.__typename === "Contact" ? ENTITY_TYPES.CONTACT : ENTITY_TYPES.COMPANY,
          ...(event.data?.__typename === "Contact" && {
            email: event.data?.email,
            phone: event.data?.phone,
          }),
          ...(event.data?.__typename === "Company" && {
            industry: event.data?.industry,
            contactEmail: event.data?.contactEmail,
          }),
        },
      },
    });
    setRowData(updatedRowData);
  };

  return (
    <AgGrid
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

  if (loading) return <Typography.body className="text-center pt-24">Loading...</Typography.body>;
  if (error) return <Typography.error className="text-center pt-24">Error: {error.message}</Typography.error>;

  const entities = getEntitiesQuery?.getEntities;
  if (!entities || entities?.length === 0) return <Typography.error className="text-center pt-24">No data</Typography.error>;

  const notNullEntities = entities.filter((entity) => entity !== null) as Entity[];

  return <EntitiesGrid entities={notNullEntities} />;
}
