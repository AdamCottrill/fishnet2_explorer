import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { Form } from "semantic-ui-react";

import { useGetTablesQuery } from "../services/tables";
import { setTable } from "../features/TableSlice";

const SideBarTableList = () => {
  const { data, error, isLoading, isFetching } = useGetTablesQuery();

  const dispatch = useDispatch();
  const [tableFilter, setTableFilter] = useState("");

  const contains = (val, filter) => {
    filter = filter ? filter.toUpperCase() : "";
    val = val ? val.toUpperCase() : "";
    if (filter === "") {
      return true;
    } else {
      return val.includes(filter) ? true : false;
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    dispatch(setTable({ value: e.target.id }));
  };

  const RenderTableList = ({ tables, filter }) => {
    return tables.map((table) => {
      if (contains(table, filter)) {
        return (
          <div key={table}>
            <button className="link" id={table} onClick={handleLinkClick}>
              {table}
            </button>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      {error ? (
        <h3>Aw snap - something when wrong....</h3>
      ) : isLoading || isFetching ? (
        <div>Loading...</div>
      ) : data ? (
        <>
          <Form size="mini">
            <Form.Input
              type="text"
              placeholder="Filter tables..."
              onChange={(e) => setTableFilter(e.target.value)}
            />
          </Form>
          <RenderTableList tables={data.tables} filter={tableFilter} />
        </>
      ) : null}
    </div>
  );
};

export default SideBarTableList;
