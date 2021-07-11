import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { Container, Grid, Loader, Message, Segment } from 'semantic-ui-react';

import StatsSideBar from '../components/StatsSideBar';
import { ProjectTypeContext } from '../contexts/ProjectTypeContext';
import { TableContext } from '../contexts/TableContext';
import { SelectedFieldContext } from '../contexts/SelectedFieldContext';

import { getFieldStats } from '../services/api';

import ShowFieldStats from '../components/ShowFieldStats';

export default function FieldStats() {
  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);
  const { selectedField } = useContext(SelectedFieldContext);

  let queryEnabled = (selectedField && selectedField !== null) === true;
  const { data, error, isFetching } = useQuery(
    ['field-stats', projectType, selectedTable, selectedField],
    () => getFieldStats(projectType, selectedTable, selectedField),
    {
      enabled: queryEnabled,
    }
  );

  if (error) {
    return (
      <Message negative>
        <Message.Header>Aw Snap!</Message.Header>
        <p>Something went wrong</p>
      </Message>
    );
  }

  return (
    <Grid.Row>
      <Grid.Column width={3}>
        <StatsSideBar />
      </Grid.Column>
      <Grid.Column width={13}>
        <Grid.Row>
          <Container>
            {selectedField ? (
              isFetching ? (
                <div>
                  <h3>
                    <em>
                      Fetching Data for "{selectedField}" from the
                      {selectedTable} table
                    </em>
                  </h3>
                  <Segment basic size="massive" padded="very">
                    <Loader active size="massive"></Loader>
                  </Segment>
                </div>
              ) : (
                <ShowFieldStats data={data} />
              )
            ) : (
              <Message>
                <Message.Header>Select A Field</Message.Header>
                <Message.List>
                  <Message.Item>
                    Select a field from the menu on the left to see a summary
                    how and when it has been used in the {selectedTable} of{' '}
                    {projectType} projects.
                  </Message.Item>
                </Message.List>
              </Message>
            )}
          </Container>
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
  );
}
