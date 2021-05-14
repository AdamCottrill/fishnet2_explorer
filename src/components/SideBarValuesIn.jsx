import React, { useState, useContext, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useQuery } from "react-query";

import { ProjectTypeContext } from "../contexts/ProjectTypeContext";
import { TableContext } from "../contexts/TableContext";
import { FiltersContext } from "../contexts/FiltersContext";

import { getTableFields } from "../services/api";

const SideBarValuesIn = (props) => {
  // when the selectedTable changes - update the list of fields in state
  // current localFilters for this component willalso have to come from context

  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);
  const { filters, setValuesIn } = useContext(FiltersContext);

  const [localFilters, setLocalFilters] = useState({});

  useEffect(() => {
    setLocalFilters({ ...filters.valuesIn });
  }, [filters, setLocalFilters]);

  const { data, error, isLoading, isFetching } = useQuery(
    ["getTableFields", projectType, selectedTable],
    () => getTableFields(projectType, selectedTable)
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
    setValuesIn(localFilters);
  };

  return (
    <div>
      {data && (
        <Form size="mini">
          {data.fields.map((fld) => (
            <Form.Input
              key={fld}
              value={localFilters[fld] ? localFilters[fld] : ""}
              type="text"
              name={fld}
              placeholder={`${fld} values in...`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </Form>
      )}
    </div>
  );
};

export default SideBarValuesIn;
