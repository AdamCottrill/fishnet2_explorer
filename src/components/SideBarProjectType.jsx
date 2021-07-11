import React, { useContext } from 'react';

import { ProjectTypeContext } from '../contexts/ProjectTypeContext';

import { Flex, RadioGroup, Radio, Stack } from '@chakra-ui/react';

import { projectTypes } from '../utils';

const SideBarProjectType = (props) => {
  const { projectType, setProjectType } = useContext(ProjectTypeContext);

  const handleChange = (event, { value }) => {
    setProjectType(value);
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
            <Radio size="sm" value={ptype}>
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default SideBarProjectType;
