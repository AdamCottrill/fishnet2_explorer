import "./App.css";
import { useSelector } from "react-redux";
import { getSelectedTable } from "./features/TableSlice";

import { Container, Grid } from "semantic-ui-react";

import SideBar from "./components/SideBar";

import TableData from "./components/TableData";

function App() {
  const selectedTable = useSelector(getSelectedTable);

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
            <Grid.Column>
              <TableData />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
