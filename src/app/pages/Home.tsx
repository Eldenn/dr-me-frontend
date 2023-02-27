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
  Center,
} from '@chakra-ui/react';
import React, { FC, useCallback, useEffect } from 'react';
import { Link as ReachLink, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '@/app/constants/navigation';

const Home: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { fromDomain } = useParams();

  console.log('fromDomain', fromDomain);

  const handleLogin = useCallback(() => {
    //navigate(ROUTES.ACCOUNT.path);
    //window.open('http://127.0.0.1:8080/', '', 'width=800,height=600');

    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'login',
          data: 'login',
        },
        `http://127.0.0.1:8080`,
      );
      window.close();
    } else {
      window.open(`http://127.0.0.1:8080/test`, '', 'width=800,height=600');
    }
  }, []);

  // add event listener to receive a message from the popup
  useEffect(() => {
    window.addEventListener('message', (event) => {
      console.log('event', event.data);
      if (event.data.type === 'login' && event.origin === 'http://127.0.0.1:8080') {
        window.removeEventListener('message', () => {});
        navigate(ROUTES.ACCOUNT.path);
      }
    });

    // remove event listener on cleanup
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, [navigate]);

  return (
    <div>
      <Stack align={'center'} width={'md'}>
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
      <Center>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} mt={5} width={'md'}>
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
                onClick={handleLogin}
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
      </Center>
    </div>
  );
};

export default Home;
