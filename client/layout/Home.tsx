import { AppShell } from '@mantine/core';

import HeaderComponent from '../components/Header';
import NavbarComponent from '../components/Navbar';
import { VideoContextProvider } from '../context/videos';

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <VideoContextProvider>
      <AppShell
        padding="md"
        navbar={<NavbarComponent />}
        header={<HeaderComponent />}
      >
        {children}
      </AppShell>
    </VideoContextProvider>
  );
}

export default HomePageLayout;
