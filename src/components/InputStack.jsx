import React from 'react';

import { Input, Stack } from '@chakra-ui/react';

export default function InputStack(props) {
  const { fields, filters, handleBlur, handleChange } = props;
  return (
    <Stack>
      {fields.map((fld) => (
        <Input
          key={fld}
          size="sm"
          value={filters[fld] ? filters[fld] : ''}
          type="text"
          name={fld}
          placeholder={`${fld} values in...`}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ))}
    </Stack>
  );
}
