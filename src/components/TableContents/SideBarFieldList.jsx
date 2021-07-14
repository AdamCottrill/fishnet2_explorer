import React, { useContext } from 'react';

import { useQuery } from 'react-query';

import { SelectedContext } from '../../contexts/SelectedContext';

import { FieldsContext } from '../../contexts/FieldsContext';
import { getTableFields } from '../../services/api';

import CheckboxStack from '../CheckboxStack';

const SideBarFieldList = (props) => {
  // when the selectedTable changes - update the list of fields in state

  const { selected } = useContext(SelectedContext);
  const { setFields } = useContext(FieldsContext);

  const { table: selectedTable, projectType } = selected;

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
    setFields(fld);
  };

  return (
    <div>
      {data && (
        <CheckboxStack
          fields={data.fields}
          toggleFieldState={toggleFieldState}
        />
      )}
    </div>
  );
};

export default SideBarFieldList;
