import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type RowData = {
  make: string;
  model: string;
  price: number;
  electric: boolean;
};

type ColDef = {
  field: keyof RowData;
};

// Create new GridExample component
export const AgGrid = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<RowData[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef[]>([{ field: "make" }, { field: "model" }, { field: "price" }, { field: "electric" }]);

  const defaultColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz-dark"} style={{ width: "100%", height: "500px" }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
    </div>
  );
};
