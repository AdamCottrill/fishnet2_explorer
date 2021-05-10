import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";

//import { getSelectedTable } from "../features/TableSlice";
import { getFields, toggleFieldState } from "../features/FieldsSlice";

//import { useGetTableFieldsQuery } from "../services/tableFields";

const SideBarFieldList = () => {
  //  const selectedTable = useSelector(getSelectedTable);
  const fields = useSelector(getFields);

  const dispatch = useDispatch();

  console.log("fields = ", fields);

  // const { data, error, isLoading, isFetching } = useGetTableFieldsQuery(
  //   selectedTable
  // );

  // if (error) {
  //   return <div>Something went wrong</div>;
  // }

  // if (isLoading || isFetching) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      {fields && (
        <Form size="mini" style={{ textAlign: "left" }}>
          {Object.entries(fields).forEach(([value, checked]) => (
            <Form.Checkbox
              size="mini"
              key={value}
              label={value}
              value={value}
              checked={checked}
              onChecked={dispatch(toggleFieldState(value))}
            />
          ))}
        </Form>
      )}
    </div>
  );
};

export default SideBarFieldList;
