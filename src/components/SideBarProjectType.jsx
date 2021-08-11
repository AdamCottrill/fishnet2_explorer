import React, { useContext } from 'react';

import { SelectedContext } from '../contexts/SelectedContext';

import { Flex, RadioGroup, Radio, Stack } from '@chakra-ui/react';

import { projectTypes } from '../utils';

const SideBarProjectType = (props) => {
  const { selected, setSelected } = useContext(SelectedContext);

  const { projectType } = selected;

  const handleChange = (value) => {
    console.log(value);
    setSelected('projectType', value);
  };

  return (
    <Flex>
      <RadioGroup
        name="project-type-radio-buttons"
        defaultValue={projectType}
        onChange={handleChange}
      >
        <Stack px={2}>
          {projectTypes.map(([ptype, label]) => (
            <Radio size="sm" key={ptype} value={ptype}>
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default SideBarProjectType;
