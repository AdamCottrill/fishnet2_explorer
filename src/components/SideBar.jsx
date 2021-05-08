import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { useGetTablesQuery } from "../services/tables";

import { setTable } from "../features/TableSlice";

const SideBar = (props) => {
  //const { setTable } = props;
  const dispatch = useDispatch();
  const [tableFilter, setTableFilter] = useState();

  const { data, error, isLoading, isFetching } = useGetTablesQuery();

  const contains = (val, filter) => {
    filter = filter ? filter : "";
    if (filter === "") {
      return true;
    } else {
      return val.toUpperCase().includes(filter.toUpperCase()) ? true : false;
    }
  };

  return (
    <>
      <h3>Sidebar</h3>

      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Tables
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {error ? (
                <h3>Aw snap - something when wrong....</h3>
              ) : isLoading || isFetching ? (
                <h3>Loading...</h3>
              ) : data ? (
                <>
                  <Form.Group>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Filter tables..."
                      onChange={(e) => setTableFilter(e.target.value)}
                    />
                  </Form.Group>

                  {data.tables.map((table) => {
                    if (contains(table, tableFilter)) {
                      return (
                        <Button
                          size="sm"
                          key={table}
                          value={table}
                          onClick={(e) =>
                            dispatch(setTable({ value: e.target.value }))
                          }
                          variant="link"
                        >
                          {table}
                        </Button>
                      );
                    } else {
                      return null;
                    }
                  })}
                </>
              ) : null}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Fields
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              This card will hold a list of check boxes that can be used to add
              or remove fields from the record set.
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
