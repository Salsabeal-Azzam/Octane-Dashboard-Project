import React from "react";
import { Table, Group, Box } from "@mantine/core";
import { ReusableTableProps, TableData } from "./types";

export const ReusableTable = <T extends TableData>({
  data,
  columns,
  actions,
}: ReusableTableProps<T>) => {
  return (
    <Table highlightOnHover striped withBorder>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor as string}>{col.header}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col.accessor as string}> {col.render ? col.render(row) : row[col.accessor]}</td>
            ))}
            {actions && (
              <td>
                <Group spacing="xs">
                  {actions.map((action, actionIndex) => (
                    <Box key={actionIndex}>{action.content(row)}</Box>
                  ))}
                </Group>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
