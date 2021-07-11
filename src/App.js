import { useContext } from 'react';

import './App.css';

import { Container, List, Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TableContents from './pages/TableContents';
import FieldStats from './pages/FieldStats';

import Nav from './components/Nav'
import { ProjectTypeContext } from './contexts/ProjectTypeContext';
import { TableContext } from './contexts/TableContext';

import { projectTypes } from './utils';

function App() {
  const { selectedTable } = useContext(TableContext);
  const { projectType } = useContext(ProjectTypeContext);

  const projectTypeLabel = projectTypes.filter((x) => x[0] === projectType)[0];

  return (
    <Router>
      <div className="App">
        <Container fluid>
          <div>
            <Nav />

            <Grid>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <h2>
                    <div>ProjectType: {projectTypeLabel[1]} </div>
                    <div>Table: {selectedTable}</div>
                  </h2>
                </Grid.Column>
              </Grid.Row>

              <Switch>
                <Route path="/field_stats">
                  <FieldStats />
                </Route>
                <Route path="/">
                  <TableContents />
                </Route>
              </Switch>
            </Grid>
          </div>
        </Container>
      </div>
    </Router>
  );
}

export default App;
