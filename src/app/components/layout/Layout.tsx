import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }: ILayoutProps) => (
  <Flex w={'100%'} minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      {children}
    </Stack>
  </Flex>
);

export default Layout;
