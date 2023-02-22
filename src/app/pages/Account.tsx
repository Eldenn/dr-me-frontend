import { Box, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

const Account: FC = () => {
  return <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}></Box>;
};

export default Account;
