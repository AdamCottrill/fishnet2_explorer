import React from "react";
import { useSelector } from "react-redux";

import { getSelectedTable } from "../features/TableSlice";
import { useGetTableDataQuery } from "../services/tableData";

import SortableTable from "./SortableTable";

const TableData = () => {
  const selectedTable = useSelector(getSelectedTable);

  const { data, error, isLoading, isFetching } = useGetTableDataQuery(
    selectedTable
  );

  const makeColumns = (row) => {
    if (typeof row === "undefined") {
      return "";
    }
    const columns = Object.keys(data.data[0]).map((x) => ({
      Header: x,
      accessor: x,
      Cell: (props) => (props.value ? props.value : "--"),
    }));
    return columns;
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const columns = makeColumns(data.data[0]);

  return (
    <div>{data && <SortableTable columns={columns} data={data.data} />}</div>
  );
};

export default TableData;
