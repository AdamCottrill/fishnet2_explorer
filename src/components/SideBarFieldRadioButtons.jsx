import React, { useContext, useState } from 'react';

import { useQuery } from 'react-query';

import { TableContext } from '../contexts/TableContext';
import { ProjectTypeContext } from '../contexts/ProjectTypeContext';
import { SelectedFieldContext } from '../contexts/SelectedFieldContext';

import { getTableFields } from '../services/api';

import SidebarRadioInput from './SidebarRadioInput/SidebarRadioInput';

const SideBarFieldRadioButtons = (props) => {
  // when the selectedTable changes - update the list of fields in state

  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);

  const { selectedField, setSelectedField } = useContext(SelectedFieldContext);

  const { data, error, isLoading, isFetching } = useQuery(
    ['getTableFields', projectType, selectedTable],
    () => getTableFields(projectType, selectedTable)
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <SidebarRadioInput
        name="field-radio-buttons"
        items={data.fields}
        selectedItem={selectedField}
        setSelectedItem={setSelectedField}
      />
    </div>
  );
};

export default SideBarFieldRadioButtons;
