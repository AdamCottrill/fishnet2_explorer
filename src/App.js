import { useContext } from 'react';

import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Heading} from "@chakra-ui/react";

import TableContents from './pages/TableContents';
import FieldStats from './pages/FieldStats';
import Nav from './components/Nav'
import { SelectedContext } from './contexts/SelectedContext';
import { projectTypes } from './utils';

function App() {
  const { selected } = useContext(SelectedContext);

  const {table:selectedTable, projectType} = selected

  const projectTypeLabel = projectTypes.filter((x) => x[0] === projectType)[0];

  return (
    <Router>
      <div className="App">
            <Nav />
                  <Heading as="h2" mb={6} size="lg">
                    <div>ProjectType: {projectTypeLabel[1]} </div>
                    <div>Table: {selectedTable}</div>
                  </Heading>

              <Switch>
                <Route path="/field_stats">
                  <FieldStats />
                </Route>
                <Route path="/">
                  <TableContents />
                </Route>
              </Switch>

      </div>
    </Router>
  );
}

export default App;
