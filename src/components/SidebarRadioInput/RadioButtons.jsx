import React from 'react';

import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const FieldsRadioButtons = (props) => {
  const { name, items, selectedItem, setSelectedItem } = props;

  return (
    <RadioGroup
      name={name}
      onChange={setSelectedItem}
      defaultValue={selectedItem}
    >
      {items.map((item) => {
        return (
          <Stack px={2}>
            <Radio mt={1} size="sm" value={item}>
              {item}
            </Radio>
          </Stack>
        );
      })}
    </RadioGroup>
  );
};

export default FieldsRadioButtons;
