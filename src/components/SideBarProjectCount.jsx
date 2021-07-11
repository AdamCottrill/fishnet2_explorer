import React, { useContext } from 'react';

import { useQuery } from 'react-query';

import { TableContext } from '../contexts/TableContext';
import { ProjectTypeContext } from '../contexts/ProjectTypeContext';
import { getProjectCount } from '../services/api';
import { FiltersContext } from '../contexts/FiltersContext';
import { filters2args } from '../utils';

const SideBarProjectCount = (props) => {
  // when the selectedTable changes - update the list of fields in state

  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);

  const { filters } = useContext(FiltersContext);

  const args = filters2args(filters);

  const { data, error, isLoading, isFetching } = useQuery(
    ['project-count', projectType, selectedTable, args],
    () => getProjectCount(projectType, selectedTable, args)
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data && (
        <ul>
          {data.values.map((project, i) => (
            <li key={i}>
              {project.PRJ_CD} : {project.n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SideBarProjectCount;
