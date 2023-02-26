import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }: ILayoutProps) => (
  <Flex w={'100%'} minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
    {children}
  </Flex>
);

export default Layout;
