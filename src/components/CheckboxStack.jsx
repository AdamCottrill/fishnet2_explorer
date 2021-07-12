import React from 'react';

import { Checkbox, Stack } from '@chakra-ui/react';

export default function CheckboxStack(props) {
  const { fields, toggleFieldState } = props;

  return (
    <Stack>
      {fields.map((field) => (
        <Checkbox
          size="sm"
          value={field}
          //isChecked={_filters.notNull.includes(field)}
          onChange={() => toggleFieldState(field)}
        >
          {field}
        </Checkbox>
      ))}
    </Stack>
  );
}
