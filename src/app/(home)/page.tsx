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
import { useEffect, useState } from "react";
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
            <span className="sr-only">Edit connection</span>
            <Pencil className="h-4 w-4" />
          </Button>
        ),
      },
    ],
  },
];

const EntitiesGrid = ({ entities }: { entities: Entity[] }) => {
  // Deep copy the entities
  const [rowData, setRowData] = useState<Entity[]>(JSON.parse(JSON.stringify(entities)));
  useEffect(() => {
    setRowData(JSON.parse(JSON.stringify(entities)));
  }, [entities]);

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
      console.error(error.message);
    },
  });

  const handleNameValueChanged = (event: NewValueParams<Entity>) => {
    const isValidName = !!event.data.name && event.data.name.trim().length > 0;

    const updatedRowData: Entity[] = entities?.map((entity) => {
      return entity?.id === event.data?.id ? { ...entity, name: isValidName ? event.data.name.trim() : entity.name } : entity;
    });

    setRowData(updatedRowData);

    if (!isValidName) return;

    updateEntityMutation({
      variables: {
        input: {
          id: event.data.id,
          name: event.data.name.trim(),
          entityType: event.data?.__typename === "Contact" ? ENTITY_TYPES.CONTACT : ENTITY_TYPES.COMPANY,
          ...(event.data?.__typename === "Contact" && {
            email: event.data.email,
            phone: event.data.phone,
          }),
          ...(event.data?.__typename === "Company" && {
            industry: event.data.industry,
            contactEmail: event.data.contactEmail,
          }),
        },
      },
    });
  };

  return (
    <AgGrid
      data={rowData}
      columns={columns}
      onCellValueChanged={handleNameValueChanged}
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
  if (!!error) return <Typography.error className="text-center pt-24">Something went wrong, please try again!</Typography.error>;

  const entities = getEntitiesQuery?.getEntities ?? [];

  const notNullEntities = entities.filter((entity) => entity !== null) as Entity[];

  return <EntitiesGrid entities={notNullEntities} />;
}
