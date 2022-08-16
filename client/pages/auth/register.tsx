import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { registerUser } from '../../api';

function RegisterPage() {
  const router = useRouter();
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  //This is API Call hook
  const { mutate } = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>['0']
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: 'register',
        title: 'Creating account',
        message: 'Please wait ...',
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: 'register',
        title: 'Success',
        message: 'Successfully created an account',
      });

      router.push('/auth/login');
    },
    onError: (err: AxiosError) => {
      const message = err.response!.data;
      console.log(message);

      updateNotification({
        id: 'register',
        title: 'Error',
        message: 'User cannot be created',
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register user</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmit((values) => mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="example@email.com"
                required
                {...getInputProps('email')}
              />
              <TextInput
                label="Username"
                placeholder="username"
                required
                {...getInputProps('username')}
              />
              <PasswordInput
                label="Password"
                placeholder="strong password"
                required
                {...getInputProps('password')}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="confirm password"
                required
                {...getInputProps('confirmPassword')}
              />
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default RegisterPage;
