import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

import { SelectedContext } from '../../contexts/SelectedContext';
import { FiltersContext } from '../../contexts/FiltersContext';

import InputStack from '../InputStack';

import { getTableFields } from '../../services/api';

const SideBarValuesIn = (props) => {
  // when the selectedTable changes - update the list of fields in state
  // current localFilters for this component willalso have to come from context

  const { selected } = useContext(SelectedContext);
  const { filters, setValuesIn } = useContext(FiltersContext);

  const { table: selectedTable, projectType } = selected;

  const [localFilters, setLocalFilters] = useState({});

  useEffect(() => {
    setLocalFilters({ ...filters.valuesIn });
  }, [filters, setLocalFilters]);

  const { data, error, isLoading, isFetching } = useQuery(
    ['getTableFields', projectType, selectedTable],
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
        <InputStack
          fields={data.fields}
          filters={localFilters}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default SideBarValuesIn;
