import React, { useState } from "react";

import { Accordion, Icon } from "semantic-ui-react";

import SideBarTableList from "./SideBarTableList";
import SideBarFieldList from "./SideBarFieldList";

const SideBar = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAccordionClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <h3>Sidebar</h3>

      <Accordion styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleAccordionClick}
        >
          <Icon name="dropdown" />
          Tables
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <SideBarTableList />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleAccordionClick}
        >
          <Icon name="dropdown" />
          Fields
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <SideBarFieldList />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleAccordionClick}
        >
          <Icon name="dropdown" />
          Filters
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>Filters here</p>
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default SideBar;
