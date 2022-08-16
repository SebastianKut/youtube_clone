import { Box, Header } from '@mantine/core';
import Image from 'next/image';

function HeaderComponent() {
  return (
    <Header height={60} p="xs">
      <Box>
        <Box>
          <Image src="/logo.png" alt="logo" width="100px" height="40px" />
        </Box>
      </Box>
    </Header>
  );
}

export default HeaderComponent;
