import { useContext } from "react";

import "./App.css";

import { Container, Grid } from "semantic-ui-react";

import { TableContext } from "./contexts/TableContext";
import SideBar from "./components/SideBar";
import TableData from "./components/TableData";
import ButtonBar from "./components/ButtonBar";

function App() {
  const { selectedTable } = useContext(TableContext);

  return (
    <div className="App">
      <Container fluid>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h2>Table: {selectedTable}</h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <SideBar />
            </Grid.Column>
            <Grid.Column width={13}>
              <ButtonBar></ButtonBar>
              <TableData selectedTable={selectedTable} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
