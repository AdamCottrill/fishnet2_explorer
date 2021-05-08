import React from "react";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";

import Card from "react-bootstrap/Card";

import { getSelectedTable } from "../features/TableSlice";
import { useGetTableFieldsQuery } from "../services/tableFields";

import SideBarTableList from "./SideBarTableList";
import SideBarFieldList from "./SideBarFieldList";

const SideBar = (props) => {
  //const { setTable } = props;

  // const selectedTable = useSelector(getSelectedTable);
  // const { data, error, isLoading, isFetching } = useGetTableFieldsQuery(
  //   selectedTable
  //);

  return (
    <>
      <h3>Sidebar</h3>

      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Tables
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <SideBarTableList />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Fields
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <SideBarFieldList />
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Filters
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              THis will hold widgets to apply filters to our records
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default SideBar;
