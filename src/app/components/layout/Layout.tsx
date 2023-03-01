import { Flex } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

import '@/app/components/layout/Layout.scss';
import Background from '../background/Background';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }: ILayoutProps) => (
  <Flex
    className={'layout'}
    w={'100%'}
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    style={{
      position: 'relative',
      background: 'none'
    }}>
    <Background />
    {children}
  </Flex>
);

export default Layout;
