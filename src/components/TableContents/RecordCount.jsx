import React, { useContext } from 'react';
import { Heading } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { FiltersContext } from '../../contexts/FiltersContext';

import { getRecordCount } from '../../services/api';

import { filters2args } from '../../utils';

const RecordCount = ({ projectType, selectedTable }) => {
  const { filters } = useContext(FiltersContext);

  const args = filters2args(filters);

  const { data, error, isLoading } = useQuery(
    ['record-count', projectType, selectedTable, args],
    () => getRecordCount(projectType, selectedTable, args)
  );

  if (isLoading) {
    return <div>Counting Records...</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <>
      <Heading as="h3" size="md">
        Total Records:
        {data ? data.values[0].records.toLocaleString() : '--'}
      </Heading>
    </>
  );
};
export default RecordCount;
