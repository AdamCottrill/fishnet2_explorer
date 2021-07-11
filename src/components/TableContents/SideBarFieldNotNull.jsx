import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { ProjectTypeContext } from '../../contexts/ProjectTypeContext';
import { TableContext } from '../../contexts/TableContext';
import { FiltersContext } from '../../contexts/FiltersContext';

import CheckboxStack from '../CheckboxStack';

import { getTableFields } from '../../services/api';

const SideBarFieldNotNull = (props) => {
  // when the selectedTable changes - update the list of fields in state

  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);
  const { filters, setNotNull } = useContext(FiltersContext);

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

  const toggleFieldState = (fld) => {
    setNotNull(fld);
  };

  return (
    <div>
      {data && (
        <CheckboxStack
          fields={data.fields}
          filters={filters}
          toggleFieldState={toggleFieldState}
        />
      )}
    </div>
  );
};

export default SideBarFieldNotNull;
