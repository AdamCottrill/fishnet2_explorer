import { useContext } from 'react';

import './App.css';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
            <Nav />
                  <h2>
                    <div>ProjectType: {projectTypeLabel[1]} </div>
                    <div>Table: {selectedTable}</div>
                  </h2>

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
