import {
  useColorModeValue,
  Avatar,
  Center,
  Flex,
  Grid,
  GridItem,
  Input,
  FormControl,
  FormLabel,
  Button,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useAuth } from '@/app/providers/AuthProvider';

const Account: FC = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <Grid gap={6} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} width={'4xl'}>
      <GridItem colSpan={6}>
        <Flex justifyContent={'flex-end'}>
          <IconButton
            border={'none'}
            borderRadius={'full'}
            variant={'outline'}
            colorScheme={'teal'}
            aria-label={'Send email'}
            color={'blue.400'}
            _hover={{
              bg: 'red.500',
              color: 'white',
            }}
            size={'lg'}
            icon={<AiOutlinePoweroff />}
            onClick={handleSignOut}
          />
        </Flex>
      </GridItem>
      <GridItem colSpan={6}>
        <Center>
          <Avatar size={'2xl'} name={'Segun Adebayo'} src={'https://bit.ly/sage-adebayo'} />
        </Center>
        <Center mt={3}>
          <Badge>{t('profile.roles.admin')}</Badge>
        </Center>
      </GridItem>
      <GridItem colSpan={3}>
        <FormControl>
          <FormLabel>{t('profile.form.email')}</FormLabel>
          <Input type={'email'} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('profile.form.lastname')}</FormLabel>
          <Input type={'text'} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('profile.form.address')}</FormLabel>
          <Input type={'text'} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('profile.form.zip')}</FormLabel>
          <Input type={'text'} />
        </FormControl>
      </GridItem>

      <GridItem colSpan={3}>
        <FormControl>
          <FormLabel>{t('profile.form.firstname')}</FormLabel>
          <Input type={'text'} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('profile.form.phone')}</FormLabel>
          <Input type={'tel'} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('profile.form.city')}</FormLabel>
          <Input type={'text'} />
        </FormControl>
        <FormControl>
          <FormLabel>{t('profile.form.country')}</FormLabel>
          <Input type={'text'} />
        </FormControl>
      </GridItem>
      <GridItem colSpan={6}>
        <Button
          width={'full'}
          mt={4}
          colorScheme={'teal'}
          isLoading={false}
          loadingText={'Saving'}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}>
          {t('profile.form.submit')}
        </Button>
      </GridItem>
    </Grid>
  );
};

export default Account;
