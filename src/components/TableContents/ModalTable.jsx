import React, { useContext } from 'react';

import { Table as STable } from 'semantic-ui-react';
import { useTable } from 'react-table';

import { Button } from 'semantic-ui-react';

import { TableContext } from '../../contexts/TableContext';
import { ProjectTypeContext } from '../../contexts/ProjectTypeContext';

const ModalTable = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    data,
    columns,
  });

  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);

  const handleclick = (e) => {
    console.log(projectType, selectedTable, e.target.id);

    //openModal(projectType, selectedTable, e.target.id);
  };

  return (
    <STable compact {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th>
                    <Button fluid onClick={handleclick} id={column.Header}>
                      {column.render('Header')}
                    </Button>
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

export default ModalTable;
