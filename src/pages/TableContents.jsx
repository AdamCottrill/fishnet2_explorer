import React, { useContext } from 'react';

import { Box, Flex, HStack, VStack } from '@chakra-ui/react';

import { ProjectTypeContext } from '../contexts/ProjectTypeContext';
import { TableContext } from '../contexts/TableContext';

import SideBar from '../components/TableContents/SideBar';
import TableData from '../components/TableContents/TableData';
import ButtonBar from '../components/TableContents/ButtonBar';
import RecordCount from '../components/TableContents/RecordCount';

export default function TableContents() {
  const { selectedTable } = useContext(TableContext);
  const { projectType } = useContext(ProjectTypeContext);

  return (
    <HStack
      align="top"
      flex="1"
      spacing="30px"
      maxWidth="100%"
      overflowX="auto"
    >
      <Flex width="250px">
        <SideBar />
      </Flex>
      <Flex>
        <VStack>
          <Box maxWidth="100%">
            <RecordCount
              projectType={projectType}
              selectedTable={selectedTable}
            />
            <ButtonBar />
          </Box>
          <HStack>
            <TableData
              projectType={projectType}
              selectedTable={selectedTable}
            />
          </HStack>
        </VStack>
      </Flex>
    </HStack>
  );
}
