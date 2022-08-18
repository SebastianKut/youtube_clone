import { AppShell } from '@mantine/core';
import HeaderComponent from '../components/Header';
import NavbarComponent from '../components/Navbar';

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarComponent />}
      header={<HeaderComponent />}
    >
      {children}
    </AppShell>
  );
}

export default HomePageLayout;
