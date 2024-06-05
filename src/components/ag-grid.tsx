import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import type { ColDef, GridOptions, NewValueParams } from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
export const AgGrid = <TData extends boolean>({
  data,
  columns,
  pagination = true,
  paginationPageSize = 5,
  paginationPageSizeSelector = [5, 10, 20],
  onCellValueChanged,
}: {
  data: GridOptions<TData>["rowData"];
  columns: ColDef<TData>[];
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  onCellValueChanged?: (event: NewValueParams<TData>) => void;
}) => {
  const defaultColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz-dark"} style={{ width: "100%", height: "500px" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
};
