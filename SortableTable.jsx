import React, { useContext } from 'react';

import { Table as STable } from 'semantic-ui-react';
import { useTable } from 'react-table';

import { Button } from 'semantic-ui-react';

import { SelectedContext } from '../contexts/SelectedContext';

const SortableTable = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      data,
      columns,
    }
    //useSortBy
  );

  const { selected } = useContext(SelectedContext);
  const { table: selectedTable, projectType } = selected;

  const handleclick = (e) => {
    console.log(projectType, selectedTable, e.target.id);
  };

  return (
    <STable compact {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  //<th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <th>
                    <Button fluid onClick={handleclick} id={column.Header}>
                      {column.render('Header')}
                    </Button>

                    {/* <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsChevronDown />
                      ) : (
                        <BsChevronUp />
                      )
                    ) : (
                      ''
                    )}
                  </span> */}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>

      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </STable>
  );
};

export default SortableTable;
