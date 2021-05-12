import React, { useContext } from "react";

import { useQuery } from "react-query";

import { TableContext } from "../contexts/TableContext";
import { FieldsContext } from "../contexts/FieldsContext";
import { getTableFields } from "../services/api";

import FieldsCheckBoxes from "./FieldsCheckBoxes";

const SideBarFieldList = (props) => {
  // when the selectedTable changes - update the list of fields in state

  const { selectedTable } = useContext(TableContext);
  const { setFields } = useContext(FieldsContext);

  const { data, error, isLoading, isFetching } = useQuery(
    ["getTableFields", selectedTable],
    () => getTableFields(selectedTable)
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const toggleFieldState = (fld) => {
    setFields(fld);
  };

  return (
    <div>
      {data && (
        <FieldsCheckBoxes
          fields={data.fields}
          toggleFieldState={toggleFieldState}
        />
      )}
    </div>
  );
};

export default SideBarFieldList;
