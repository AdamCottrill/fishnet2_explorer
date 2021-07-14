import React, { useContext } from 'react';

import { useQuery } from 'react-query';

import { SelectedContext } from '../contexts/SelectedContext';
import { getTableFields } from '../services/api';
import SidebarRadioInput from './SidebarRadioInput/SidebarRadioInput';

const SideBarFieldRadioButtons = (props) => {
  // when the selectedTable changes - update the list of fields in state

  const { selected, setSelected } = useContext(SelectedContext);

  const { field: selectedField, table: selectedTable, projectType } = selected;

  const { data, error, isLoading, isFetching } = useQuery(
    ['getTableFields', projectType, selectedTable],
    () => getTableFields(projectType, selectedTable)
  );

  const setSelectedField = (value) => setSelected('field', value);

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
