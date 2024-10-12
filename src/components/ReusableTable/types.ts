import { MantineColor } from "@mantine/core";
import { ReactNode } from "react";

// Interface for each row of data
export type TableData = {
    [key: string]: any; // Generic structure to allow any data
  }
  
  // Interface for column definitions
  export type Column<T extends TableData> = {
    accessor: keyof T; // Key in the data object that will map to this column
    header: string; // Column header
    render?: (row: T) => JSX.Element | string; // Optional custom render function for cell
  }
  
  // Interface for actions
  export type TableAction<T extends TableData> = {
    content:(row:T) => ReactNode
  }
  
  // Main table props
  export type ReusableTableProps<T extends TableData> = {
    data: T[]; // Array of data rows
    columns: Column<T>[]; // Array of column definitions
    actions?: TableAction<T>[]; // Optional array of actions
  }