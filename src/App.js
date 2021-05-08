import "./App.css";
import { useSelector } from "react-redux";
import { getSelectedTable } from "./features/TableSlice";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SideBar from "./components/SideBar";

function App() {
  const selectedTable = useSelector(getSelectedTable);

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <h2>Table2: {selectedTable}</h2>
        </Row>
        <Row>
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col>
            <h3>Content</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
