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
  SkeletonCircle,
  SkeletonText,
  useToast,
  Card,
  CardHeader,
  CardBody,
  Text,
} from '@chakra-ui/react';
import React, { ChangeEvent, FC, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useAuth } from '@/app/providers/AuthProvider';
import {
  MyPersonalInformationDocument,
  useMyPersonalInformationQuery,
  useUpdateMyPersonalInformationsMutation,
  useUpdateMyUserMutation,
  useUploadMutation,
} from '@/app/generated/graphql';
import { TOAST_DURATION, TOAST_POSITION, TOAST_STATUS } from '@/app/constants/toast';
import { PROVIDERS } from '@/app/constants/files';

interface IFieldsForm {
  email?: string | null;
  lastname?: string | null;
  firstname?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  zip?: string | null;
  country?: string | null;
  profilePhoto?: string | null;
}

const { REACT_APP_STRAPI_HOST, REACT_APP_STRAPI_PORT } = process.env;

const Account: FC = () => {
  const { register, setValue, handleSubmit } = useForm<IFieldsForm>();
  const { logout, user, setUser } = useAuth();
  const { t } = useTranslation();
  const toast = useToast();
  const { data, loading } = useMyPersonalInformationQuery();
  const [photo, setPhoto] = React.useState<string>('');
  const [updateMyPersonalInformations, { data: dataPersonalInformations, loading: isPersonalInformationsLoading }] =
    useUpdateMyPersonalInformationsMutation({
      refetchQueries: [
        {
          query: MyPersonalInformationDocument,
        },
      ],
    });
  const [updateMyUser, { data: dataUser, loading: isLoadingUser }] = useUpdateMyUserMutation({
    onCompleted: (comingDataUser) => {
      if (user && comingDataUser?.updateMyUser?.email) {
        setUser({
          ...user,
          email: comingDataUser?.updateMyUser?.email,
        });
      }
    },
  });
  const [upload] = useUploadMutation({
    onCompleted: (comingDataPhoto) => {
      setPhoto(comingDataPhoto?.upload?.data?.attributes?.url || '');
      updateMyPersonalInformations({
        variables: {
          input: {
            profilePhoto: comingDataPhoto?.upload?.data?.id,
          },
        },
      });
    },
  });

  const handleSignOut = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (user && user.email) {
      setValue('email', user.email);
    }
  }, [setValue, user]);

  useEffect(() => {
    if (data?.myPersonalInformations) {
      setValue('lastname', data?.myPersonalInformations?.lastname);
      setValue('firstname', data?.myPersonalInformations?.firstname);
      setValue('phone', data?.myPersonalInformations?.phone);
      setValue('address', data?.myPersonalInformations?.address);
      setValue('city', data?.myPersonalInformations?.city);
      setValue('zip', data?.myPersonalInformations?.zip);
      setValue('country', data?.myPersonalInformations?.country);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (dataPersonalInformations?.updateMyPersonalInformations && dataUser?.updateMyUser) {
      toast({
        status: TOAST_STATUS.SUCCESS,
        duration: TOAST_DURATION,
        isClosable: true,
        title: t('success.profile'),
        position: TOAST_POSITION,
      });
    }
  }, [dataPersonalInformations, dataUser, t, toast]);

  useEffect(() => {
    const { profilePhoto } = data?.myPersonalInformations || {};

    if (profilePhoto?.data && profilePhoto?.data?.attributes?.url) {
      if (profilePhoto?.data?.attributes?.provider === PROVIDERS.LOCAL) {
        const host = `${REACT_APP_STRAPI_HOST}:${REACT_APP_STRAPI_PORT}`;
        setPhoto(`${host}${profilePhoto?.data?.attributes?.url}`);
      } else {
        setPhoto(profilePhoto?.data?.attributes?.url);
      }
    }
  }, [data]);

  const handleAccountUpdate: SubmitHandler<IFieldsForm> = useCallback(
    ({ email, ...rest }) => {
      updateMyPersonalInformations({
        variables: {
          input: {
            ...rest,
          },
        },
      });

      updateMyUser({
        variables: {
          input: {
            email,
          },
        },
      });
    },
    [updateMyPersonalInformations, updateMyUser],
  );

  const renderBody = useMemo(() => {
    if (loading || !data) {
      return (
        <>
          <GridItem colSpan={6}>
            <Center>
              <SkeletonCircle size={'10'} />
            </Center>
          </GridItem>
          <GridItem colSpan={6}>
            <SkeletonText mt={'4'} noOfLines={4} spacing={'4'} skeletonHeight={'2'} />
          </GridItem>
        </>
      );
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        upload({
          variables: {
            file: event.target.files[0],
          },
        });
      }
    };

    return (
      <>
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
            <label>
              <input type={'file'} accept={'image/*'} onChange={handleImageChange} style={{ display: 'none' }} />
              <Avatar
                size={'2xl'}
                name={`${data?.myPersonalInformations?.firstname} ${data?.myPersonalInformations?.lastname}`}
                src={photo}
                _hover={{
                  cursor: 'pointer',
                }}
              />
            </label>
          </Center>
          <Center mt={3}>
            <Badge>{t('profile.roles.admin')}</Badge>
          </Center>
        </GridItem>
        <GridItem colSpan={6}>
          <Card>
            <CardHeader>
              <Text fontSize={'2xl'} as={'b'}>
                {t('profile.personal')}
              </Text>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(handleAccountUpdate)}>
                {/** Divise in two columns */}
                <Grid gap={6} templateColumns={'repeat(2, 2fr)'}>
                  <GridItem>
                    <FormControl>
                      <FormLabel>{t('profile.form.email')}</FormLabel>
                      <Input type={'email'} {...register('email')} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>{t('profile.form.lastname')}</FormLabel>
                      <Input type={'text'} {...register('lastname')} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>{t('profile.form.address')}</FormLabel>
                      <Input type={'text'} {...register('address')} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>{t('profile.form.zip')}</FormLabel>
                      <Input type={'text'} {...register('zip')} />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>{t('profile.form.firstname')}</FormLabel>
                      <Input type={'text'} {...register('firstname')} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>{t('profile.form.phone')}</FormLabel>
                      <Input type={'tel'} {...register('phone')} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>{t('profile.form.city')}</FormLabel>
                      <Input type={'text'} {...register('city')} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>{t('profile.form.country')}</FormLabel>
                      <Input type={'text'} {...register('country')} />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <Button
                      type={'submit'}
                      width={'full'}
                      mt={4}
                      colorScheme={'teal'}
                      isLoading={isLoadingUser || isPersonalInformationsLoading}
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
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </>
    );
  }, [
    loading,
    data,
    handleSignOut,
    photo,
    t,
    handleSubmit,
    handleAccountUpdate,
    register,
    isLoadingUser,
    isPersonalInformationsLoading,
    upload,
  ]);

  return (
    <Grid gap={6} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} width={'4xl'}>
      {renderBody}
    </Grid>
  );
};

export default Account;
