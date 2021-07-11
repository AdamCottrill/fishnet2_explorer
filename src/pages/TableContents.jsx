import React, { useContext } from 'react';

import { Grid } from 'semantic-ui-react';

import { ProjectTypeContext } from '../contexts/ProjectTypeContext';
import { TableContext } from '../contexts/TableContext';
import SideBar from '../components/SideBar';
import TableData from '../components/TableData';
import ButtonBar from '../components/ButtonBar';
import RecordCount from '../components/RecordCount';

export default function TableContents() {
  const { selectedTable } = useContext(TableContext);
  const { projectType } = useContext(ProjectTypeContext);

  return (
    <Grid.Row>
      <Grid.Column width={3}>
        <SideBar />
      </Grid.Column>
      <Grid.Column width={13}>
        <Grid.Row>
          <Grid.Column width={3}>
            <RecordCount
              projectType={projectType}
              selectedTable={selectedTable}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <ButtonBar />
          </Grid.Column>
        </Grid.Row>
        <TableData projectType={projectType} selectedTable={selectedTable} />
      </Grid.Column>
    </Grid.Row>
  );
}
