import { NextRouter, useRouter } from 'next/router';

// Call this function whenever you want to refresh props! on the same page
export const refreshData = (router: NextRouter) => {
  router.replace(router.asPath);
};
