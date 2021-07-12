import React, { useContext } from 'react';

import { Button, HStack } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

import { FiltersContext } from '../../contexts/FiltersContext';

const ButtonBar = (props) => {
  const { filters, delNotNull, delValuesIn, delFieldContains } =
    useContext(FiltersContext);

  const NotNullButtons = ({ values }) => {
    return values.map((value) => (
      <Button
        key={value}
        size="xs"
        colorScheme="red"
        px={2}
        rounded="full"
        onClick={() => delNotNull(value)}
        rightIcon={<SmallCloseIcon />}
      >
        {value} Not NULL
      </Button>
    ));
  };

  const ValuesInButtons = ({ values }) => {
    if (Object.keys(values).length === 0) {
      return '';
    }

    return Object.entries(values).map(([key, value]) => (
      <Button
        key={value}
        size="xs"
        colorScheme="yellow"
        px={2}
        rounded="full"
        onMouseUp={() => delValuesIn(key)}
        rightIcon={<SmallCloseIcon />}
      >
        {`${key}=${value}`}
      </Button>
    ));
  };

  const ValuesContainButtons = ({ values }) => {
    if (Object.keys(values).length === 0) {
      return '';
    }

    return Object.entries(values).map(([key, value]) => (
      <Button
        key={value}
        size="xs"
        p={2}
        colorScheme="blue"
        rounded="full"
        rightIcon={<SmallCloseIcon />}
        onMouseUp={() => delFieldContains(key)}
      >
        {`${key}=*${value}*`}{' '}
      </Button>
    ));
  };

  return (
    <HStack my={2} spacing={2}>
      {filters.valuesIn && <ValuesInButtons values={filters.valuesIn} />}
      {filters.fieldContains && (
        <ValuesContainButtons values={filters.fieldContains} />
      )}
      {filters.notNull ? <NotNullButtons values={filters.notNull} /> : ''}
    </HStack>
  );
};

export default ButtonBar;
