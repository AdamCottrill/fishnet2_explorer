import React from "react";

import { Table as STable } from "semantic-ui-react";
import { useTable, useSortBy } from "react-table";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const SortableTable = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      data,
      columns,
    },
    useSortBy
  );

  return (
    <STable compact {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <BsChevronDown />
                    ) : (
                      <BsChevronUp />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </STable>
  );
};

export default SortableTable;
