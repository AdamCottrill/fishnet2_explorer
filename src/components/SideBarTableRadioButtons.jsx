import React, { useContext } from 'react';

import { useQuery } from 'react-query';

import { SelectedContext } from '../contexts/SelectedContext';

import { getTables } from '../services/api';

import SidebarRadioInput from './SidebarRadioInput/SidebarRadioInput';

const SideBarTableRadioButtons = (props) => {
  const { selected, setSelected } = useContext(SelectedContext);
  const { table: selectedTable, projectType } = selected;

  const { data, error, isLoading, isFetching } = useQuery(
    ['tableList', projectType],
    () => getTables(projectType)
  );

  const setSelectedTable = (value) => setSelected('table', value);

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <SidebarRadioInput
        name="project-type-radio-buttons"
        placeholder="Filter tables...."
        items={data.tables}
        selectedItem={selectedTable}
        setSelectedItem={setSelectedTable}
      />
    </div>
  );
};

export default SideBarTableRadioButtons;
