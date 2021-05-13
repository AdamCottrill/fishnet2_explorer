import React, { useState } from "react";

import { Accordion, Icon } from "semantic-ui-react";

import SideBarTableList from "./SideBarTableList";
import SideBarFieldList from "./SideBarFieldList";
import SideBarFieldContains from "./SideBarFieldContains";
import SideBarValuesIn from "./SideBarValuesIn";
import SideBarFieldNotNull from "./SideBarFieldNotNull";

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
          active={activeIndex === 99}
          index={99}
          onClick={handleAccordionClick}
        >
          <Icon name="dropdown" />
          Project Type
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 99}>
          <p>Check box array of our project types</p>
          <ul>
            <li>All</li>
            <li>CD/CF</li>
            <li>IA/IS</li>
            <li>SC</li>
            <li>SD</li>
            <li>SF</li>
          </ul>
        </Accordion.Content>

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
          Field Contains...
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <SideBarFieldContains />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleAccordionClick}
        >
          <Icon name="dropdown" />
          Field Value in...
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <SideBarValuesIn />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 4}
          index={4}
          onClick={handleAccordionClick}
        >
          <Icon name="dropdown" />
          Field Is Not Null
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <SideBarFieldNotNull />
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default SideBar;
