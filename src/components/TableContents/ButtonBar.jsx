import React, { useContext } from 'react';

import { Button, Icon, Segment } from 'semantic-ui-react';
import { FiltersContext } from '../../contexts/FiltersContext';

const ButtonBar = (props) => {
  const { filters, delNotNull, delValuesIn, delFieldContains } =
    useContext(FiltersContext);

  const NotNullButtons = ({ values }) => {
    return values.map((value) => (
      <Button
        key={value}
        size="mini"
        color="red"
        icon
        onClick={() => delNotNull(value)}
        labelPosition="right"
      >
        {value} Not NULL <Icon name="x" />
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
        size="mini"
        color="yellow"
        icon
        onMouseUp={() => delValuesIn(key)}
        labelPosition="right"
      >
        {`${key}=${value}`} <Icon name="x" />
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
        size="mini"
        color="blue"
        icon
        onMouseUp={() => delFieldContains(key)}
        labelPosition="right"
      >
        {`${key}=*${value}*`} <Icon name="x" />
      </Button>
    ));
  };

  return (
    <Segment basic>
      {filters.valuesIn && <ValuesInButtons values={filters.valuesIn} />}
      {filters.fieldContains && (
        <ValuesContainButtons values={filters.fieldContains} />
      )}
      {filters.notNull ? <NotNullButtons values={filters.notNull} /> : ''}
    </Segment>
  );
};

export default ButtonBar;
