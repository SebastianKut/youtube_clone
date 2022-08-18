import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '../context/context';

const queryClient = new QueryClient();

// Creating new types with layouts by extending existing Next types
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // getLayout is page with Layout or page without layout
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        {/* Head can be used in other components and title can be overridden */}
        <title>Youtube Clone</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <NotificationsProvider>
              {getLayout(
                <main>
                  <Component {...pageProps} />
                </main>
              )}
            </NotificationsProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
