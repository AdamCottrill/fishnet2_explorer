import React from 'react';
import { Link } from 'react-router-dom';

import {
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Nav() {
  const { colormode, toggleColorMode } = useColorMode();
  return (
    <Flex p={2}>
      <HStack spacing={4} px={4}>
        <Link to="/">Table Contents</Link>
        <Link to="/field_stats">Field Stats</Link>
      </HStack>

      <Spacer />
      <IconButton
        rounded="full"
        variant="ghost"
        aria-label="toggle-color-theme"
        onClick={() => toggleColorMode()}
        icon={colormode === 'light' ? <MoonIcon /> : <SunIcon />}
      />
    </Flex>
  );
}
