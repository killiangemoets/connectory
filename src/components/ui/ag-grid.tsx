import { SearchInput } from "../inputs/text";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import type { ColDef, ColGroupDef, GridOptions, NewValueParams } from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const AgGrid = <
  TData extends {
    [key: string]: unknown;
  }
>({
  data,
  columns,
  pagination = true,
  paginationPageSize = 10,
  paginationPageSizeSelector = [10, 20, 50],
  onCellValueChanged,
  extra,
}: {
  data: GridOptions<TData>["rowData"];
  columns: (ColDef<TData> | ColGroupDef<TData>)[];
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  onCellValueChanged?: (event: NewValueParams<TData>) => void;
  extra?: React.ReactNode;
}) => {
  const [quickFilterText, setQuickFilterText] = useState<string>();
  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="flex flex-col gap-4 h-[90vh]">
      <div className="grid grid-cols-1 sm:flex  gap-2">
        <SearchInput
          className="w-96 order-last sm:order-fisrt"
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />
        <div className="extra order-first sm:order-last ml-auto">{extra}</div>
      </div>
      <div className={"ag-theme-quartz-dark"} style={{ width: "100%", height: "100%" }}>
        <AgGridReact
          quickFilterText={quickFilterText}
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};
