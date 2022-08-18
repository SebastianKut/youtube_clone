import { Anchor, Box, Header } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/context';
import UploadVideo from './UploadVideo';

function HeaderComponent() {
  const { user, refetch } = useUserContext();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Header height={60} p="xs">
      <Box sx={() => ({ display: 'flex' })}>
        <Box sx={() => ({ flex: '1' })}>
          <Image src="/logo.png" alt="logo" width="100px" height="40px" />
        </Box>
        {!user && (
          <>
            <Link href="/auth/login" passHref>
              <Anchor ml="lg" mr="lr">
                Login
              </Anchor>
            </Link>
            <Link href="/auth/register" passHref>
              <Anchor ml="lg" mr="lr">
                Register
              </Anchor>
            </Link>
          </>
        )}

        {user && <UploadVideo />}
      </Box>
    </Header>
  );
}

export default HeaderComponent;
