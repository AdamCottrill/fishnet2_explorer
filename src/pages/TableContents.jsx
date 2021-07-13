import React, { useContext } from 'react';

import { Box, Center, Flex, HStack, VStack } from '@chakra-ui/react';

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
    <HStack align="top" flex="1" spacing="30px">
      <Flex width="250px">
        <SideBar />
      </Flex>
      <VStack alignItems="left">
        <Box width="1200px">
          <RecordCount
            projectType={projectType}
            selectedTable={selectedTable}
          />
          <Center>
            <ButtonBar />
          </Center>
        </Box>
        <TableData projectType={projectType} selectedTable={selectedTable} />
      </VStack>
    </HStack>
  );
}
