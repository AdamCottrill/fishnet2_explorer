import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';

import MySpinner from '../components/MySpinner';
import StatsSideBar from '../components/StatsSideBar';
import { ProjectTypeContext } from '../contexts/ProjectTypeContext';
import { TableContext } from '../contexts/TableContext';
import { SelectedFieldContext } from '../contexts/SelectedFieldContext';

import { getFieldStats } from '../services/api';

import ShowFieldStats from '../components/ShowFieldStats';

export default function FieldStats() {
  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);
  const { selectedField } = useContext(SelectedFieldContext);

  let queryEnabled = (selectedField && selectedField !== null) === true;
  const { data, error, isFetching } = useQuery(
    ['field-stats', projectType, selectedTable, selectedField],
    () => getFieldStats(projectType, selectedTable, selectedField),
    {
      enabled: queryEnabled,
    }
  );

  if (error) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Aw Snap!
        </AlertTitle>
        <AlertDescription maxWidth="sm">Something went wrong!</AlertDescription>
      </Alert>
    );
  }

  const spinnerMessage = `Fetching Data for "${selectedField}" from the ${selectedTable} table`;

  return (
    <HStack align="top" spacing="30px" flex="1">
      <Flex width="250px">
        <StatsSideBar />
      </Flex>
      <Box flex="1">
        {selectedField ? (
          isFetching ? (
            <MySpinner message={spinnerMessage} />
          ) : (
            <ShowFieldStats data={data} />
          )
        ) : (
          <Flex align="center" border="1px" p={25} borderRadius={15} m={10}>
            <VStack flex="1">
              <Heading as="h2" size="md">
                Select A Field
              </Heading>
              <Flex pt={4}>
                Select a field from the menu on the left to see a summary of how
                and when that field has been used in the {selectedTable} table
                of {projectType} projects.
              </Flex>
            </VStack>
          </Flex>
        )}
      </Box>
    </HStack>
  );
}
