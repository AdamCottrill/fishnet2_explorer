import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";

import { getSelectedTable } from "../features/TableSlice";

import { useGetTableFieldsQuery } from "../services/tableFields";

const SideBarFieldList = () => {
  const selectedTable = useSelector(getSelectedTable);

  console.log("selectedTable = ", selectedTable);
  const { data, error, isLoading, isFetching } = useGetTableFieldsQuery(
    selectedTable
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data && data.fields && (
        <Form>
          {data.fields.map((fld) => (
            <Form.Check
              style={{ textAlign: "left" }}
              key={fld}
              label={fld}
              value={fld}
              checked
            />
          ))}
        </Form>
      )}
    </div>
  );
};

export default SideBarFieldList;
