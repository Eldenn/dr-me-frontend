import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, FormLabel, Input, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '@/app/constants/navigation';

const ForgottenPassword: FC = () => {
  const { t } = useTranslation();

  return (
    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
      <Stack spacing={4}>
        <FormControl id={'email'}>
          <FormLabel>{t('form.email')}</FormLabel>
          <Input type={'email'} />
        </FormControl>
        <Stack spacing={10}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            {t('forgot.send')}
          </Button>
          <Button as={ReachLink} to={ROUTES.HOME.path} leftIcon={<ArrowBackIcon />}>
            {t('forgot.back')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ForgottenPassword;
