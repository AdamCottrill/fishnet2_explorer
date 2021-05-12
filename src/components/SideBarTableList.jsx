import React, { useState, useContext } from "react";

import { Form } from "semantic-ui-react";

import { useQuery } from "react-query";
import { getTables } from "../services/api";

import { TableContext } from "../contexts/TableContext";
import { FieldsContext } from "../contexts/FieldsContext";

const SideBarTableList = () => {
  const { data, error, isLoading, isFetching } = useQuery(
    "tableList",
    getTables
  );

  const [tableFilter, setTableFilter] = useState("");

  const { setSelectedTable } = useContext(TableContext);
  const { resetFields } = useContext(FieldsContext);

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
    setTableFilter("");
    resetFields();
    setSelectedTable(e.target.id);
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
              value={tableFilter}
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
