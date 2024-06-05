import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
export const AgGrid = ({ data, columns }: { data: any; columns: any }) => {
  const defaultColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz-dark"} style={{ width: "100%", height: "500px" }}>
      <AgGridReact rowData={data} columnDefs={columns} defaultColDef={defaultColDef} />
    </div>
  );
};
