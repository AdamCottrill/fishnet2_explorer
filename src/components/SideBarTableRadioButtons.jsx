import React, { useContext, useState } from 'react';

import { useQuery } from 'react-query';

import { TableContext } from '../contexts/TableContext';
import { ProjectTypeContext } from '../contexts/ProjectTypeContext';

import { getTables } from '../services/api';

import SidebarRadioInput from './SidebarRadioInput/SidebarRadioInput';

const SideBarTableRadioButtons = (props) => {
  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable, setSelectedTable } = useContext(TableContext);

  const { data, error, isLoading, isFetching } = useQuery(
    ['tableList', projectType],
    () => getTables(projectType)
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
        name="project-type-radio-buttons"
        items={data.tables}
        selectedItem={selectedTable}
        setSelectedItem={setSelectedTable}
      />
    </div>
  );
};

export default SideBarTableRadioButtons;
