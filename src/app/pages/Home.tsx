import {
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
import { Link as ReachLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '@/app/constants/navigation';

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
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
              <Link as={ReachLink} to={ROUTES.FORGOTTEN_PASSWORD.path} color={'blue.400'}>
                {t('form.forgot')}
              </Link>
            </Stack>
            <Button
              as={ReachLink}
              to={ROUTES.ACCOUNT.path}
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
    </div>
  );
};

export default Home;
