import React, { useState } from 'react';

import { Accordion, Icon } from 'semantic-ui-react';
import SideBarProjectType from './SideBarProjectType';
import SideBarTableList from './SideBarTableList';
import SideBarFieldRadioButtons from './SideBarFieldRadioButtons';

const StatsSideBar = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAccordionClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <>
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
          <SideBarProjectType />
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
          Available Fields
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <SideBarFieldRadioButtons />
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default StatsSideBar;
