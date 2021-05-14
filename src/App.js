import { useContext } from "react";

import "./App.css";

import { Container, Grid } from "semantic-ui-react";

import { ProjectTypeContext } from "./contexts/ProjectTypeContext";
import { TableContext } from "./contexts/TableContext";
import SideBar from "./components/SideBar";
import TableData from "./components/TableData";
import ButtonBar from "./components/ButtonBar";
import RecordCount from "./components/RecordCount";

import { projectTypes } from "./utils";

function App() {
  const { selectedTable } = useContext(TableContext);
  const { projectType } = useContext(ProjectTypeContext);

  const projectTypeLabel = projectTypes.filter((x) => x[0] === projectType)[0];

  return (
    <div className="App">
      <Container fluid>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h2>
                <div>ProjectType: {projectTypeLabel[1]} </div>
                <div>Table: {selectedTable}</div>
              </h2>
            </Grid.Column>
          </Grid.Row>
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
              <TableData
                projectType={projectType}
                selectedTable={selectedTable}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
