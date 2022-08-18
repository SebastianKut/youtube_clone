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
import {
  showNotification,
  updateNotification,
  hideNotification,
} from '@mantine/notifications';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { loginUser } from '../../api';

function LoginPage() {
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
    Parameters<typeof loginUser>['0']
  >(loginUser, {
    onMutate: () => {
      showNotification({
        id: 'login',
        title: 'Login into account',
        message: 'Please wait ...',
        loading: true,
      });
    },
    onSuccess: (data) => {
      hideNotification('login');
      router.replace('/');
      console.log('User data', data);
    },
    onError: (err: AxiosError) => {
      const message = err.response!.data;
      console.log(message);

      updateNotification({
        id: 'login',
        title: 'Error',
        message: 'There is a problem login you in',
      });
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Title>Login</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmit((values) => mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="example@email.com"
                required
                {...getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="strong password"
                required
                {...getInputProps('password')}
              />
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default LoginPage;
