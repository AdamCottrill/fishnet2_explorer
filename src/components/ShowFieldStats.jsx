import React, { useContext } from 'react';

import { Grid, Table } from 'semantic-ui-react';

import { SelectedFieldContext } from '../contexts/SelectedFieldContext';
import { TableContext } from '../contexts/TableContext';

export default function ShowFieldStats(props) {
  const { data } = props;
  const { selectedTable } = useContext(TableContext);
  const { selectedField } = useContext(SelectedFieldContext);

  return (
    <div>
      <Grid>
        <Grid.Row fluid textAlign="center">
          {data.occurence_count && data.distinct_values && data.prj_cds ? (
            <h3>
              <strong>"{selectedField}"</strong> appears in{' '}
              {data.occurence_count.N.toLocaleString()} record
              {data.occurence_count.N > 1 && 's'} in {data.prj_cds.N} project
              {data.prj_cds.N > 1 && 's'} and has {data.distinct_values.N}{' '}
              distinct value{data.distinct_values.N > 1 && 's'}.
            </h3>
          ) : (
            <h3>
              Oops! <strong>"{selectedField}"</strong> does not appear in{' '}
              {selectedTable}! Please double check the selected field.
            </h3>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <h3>Count by Project Code</h3>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>PRJ_CD</Table.HeaderCell>
                  <Table.HeaderCell>N</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.project_counts &&
                  data.project_counts.map((project) => (
                    <Table.Row key={project.PRJ_CD}>
                      <Table.Cell>{project.PRJ_CD}</Table.Cell>
                      <Table.Cell>{project.N}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={8}>
            <h3>Count by Value</h3>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Value</Table.HeaderCell>
                  <Table.HeaderCell>N</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.common_values &&
                  data.common_values.map((val) => (
                    <Table.Row key={val.value}>
                      <Table.Cell>{val.value}</Table.Cell>
                      <Table.Cell>{val.N}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
