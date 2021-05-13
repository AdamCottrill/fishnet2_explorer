import React, { useState, useContext, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useQuery } from "react-query";

import { TableContext } from "../contexts/TableContext";
import { FiltersContext } from "../contexts/FiltersContext";

import { getTableFields } from "../services/api";

const SideBarFieldContains = (props) => {
  // when the selectedTable changes - update the list of fields in state
  // current localFilters for this component willalso have to come from context
  const { selectedTable } = useContext(TableContext);

  const { filters, setFieldContains } = useContext(FiltersContext);

  const [localFilters, setLocalFilters] = useState({});

  useEffect(() => {
    setLocalFilters({ ...filters.fieldContains });
  }, [filters, setLocalFilters]);

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

  const handleChange = (e) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setFieldContains(localFilters);
  };

  return (
    <div>
      {data && (
        <Form size="mini">
          {data.fields.map((fld) => (
            <Form.Input
              value={localFilters[fld] ? localFilters[fld] : ""}
              type="text"
              key={fld}
              name={fld}
              placeholder={`${fld} contains...`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </Form>
      )}
    </div>
  );
};

export default SideBarFieldContains;
