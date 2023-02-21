import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LoginForm: FC = () => {
  const { t } = useTranslation();

  return (
    <Flex w={'100%'} minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Text fontSize={'4xl'} color={'gray.600'}>
            🚀
          </Text>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {t('common.description')}
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {t('common.watermark')}
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id={'email'}>
              <FormLabel>{t('form.email')}</FormLabel>
              <Input type={'email'} />
            </FormControl>
            <FormControl id={'password'}>
              <FormLabel>{t('form.password')}</FormLabel>
              <Input type={'password'} />
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>{t('form.remember')}</Checkbox>
                <Link color={'blue.400'}>{t('form.forgot')}</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {t('form.signin')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
