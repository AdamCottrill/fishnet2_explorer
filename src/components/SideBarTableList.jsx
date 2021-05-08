import React, { useState } from "react";

import { useDispatch } from "react-redux";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

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

  const RenderTableList = ({ tables, filter }) => {
    return tables.map((table) => {
      if (contains(table, filter)) {
        return (
          <Button
            size="sm"
            key={table}
            value={table}
            onClick={(e) => dispatch(setTable({ value: e.target.value }))}
            variant="link"
          >
            {table}
          </Button>
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
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : data ? (
        <>
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Filter tables..."
              onChange={(e) => setTableFilter(e.target.value)}
            />
          </Form.Group>
          <RenderTableList tables={data.tables} filter={tableFilter} />
        </>
      ) : null}
    </div>
  );
};

export default SideBarTableList;
