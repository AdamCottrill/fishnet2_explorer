import React, { useState } from 'react';

import {
  Box,
  Flex,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from '@chakra-ui/react';
import SideBarProjectType from './SideBarProjectType';
import SideBarTableRadioButtons from './SideBarTableRadioButtons';
import SideBarFieldRadioButtons from './SideBarFieldRadioButtons';

const StatsSideBar = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAccordionClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Accordion m={2} allowToggle width="100%">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Project Type
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <SideBarProjectType />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Tables
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <SideBarTableRadioButtons />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Fields
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <SideBarFieldRadioButtons />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default StatsSideBar;
