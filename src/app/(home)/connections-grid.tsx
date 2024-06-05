import { AgGrid } from "@/components/ag-grid";
import { GET_ENTITIES } from "@/graphql/entities";
import type { GetEntitiesQuery } from "@/utils/gql/graphql";
import type { NewValueParams } from "@ag-grid-community/core";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const columns = [
  {
    headerName: "About",
    children: [
      {
        field: "__typename",
        headerName: "Type",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Contact", "Company", "Other"],
        },
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
];

const ConnectionsGrid = () => {
  const { loading, error, data: getEntitiesQuery } = useQuery<GetEntitiesQuery>(GET_ENTITIES);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (getEntitiesQuery?.getEntities) {
      // Deep copy of the data to avoid mutations on immutable objects
      const deepCopy = JSON.parse(JSON.stringify(getEntitiesQuery.getEntities));
      setRowData(deepCopy);
    }
  }, [getEntitiesQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const entities = getEntitiesQuery?.getEntities;
  if (!entities || entities?.length === 0) return <p>No data</p>;

  const handleCellValueChanged = (event: NewValueParams) => {
    // eslint-disable-next-line no-console
    console.log("Cell value changed", event.data);
  };

  return <AgGrid data={rowData} columns={columns} onCellValueChanged={handleCellValueChanged} />;
};

export default ConnectionsGrid;
