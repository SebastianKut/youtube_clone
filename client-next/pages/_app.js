import '../styles/globals.css';
import { ContextProvider } from '../context/Context';
import { reducer } from '../context/Context';
import Layout from '../layout/layout';
import { getUser, isRequestFromServer } from '../api';

function MyApp({ Component, pageProps, user }) {
  const initialState = {
    user: user,
    showUploadForm: false,
  };

  return (
    <ContextProvider initialState={initialState} reducer={reducer}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext) => {
  const request = appContext.ctx.req;
  const response = await getUser(isRequestFromServer(), request);

  return { user: response?.currentUser || response };
};
