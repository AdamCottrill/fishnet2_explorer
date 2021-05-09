import React from "react";
import { useSelector } from "react-redux";
import { Form } from "semantic-ui-react";

import { getSelectedTable } from "../features/TableSlice";

import { useGetTableFieldsQuery } from "../services/tableFields";

const SideBarFieldList = () => {
  const selectedTable = useSelector(getSelectedTable);

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
        <Form size="mini" style={{ textAlign: "left" }}>
          {data.fields.map((fld) => (
            <Form.Checkbox
              size="mini"
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
