import { Progress } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from '@/app/constants/navigation';

const Home = lazy(() => import('@/app/pages/Home'));
const ForgottenPassword = lazy(() => import('@/app/pages/ForgottenPassword'));
const Account = lazy(() => import('@/app/pages/Account'));

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<Progress size={'lg'} isIndeterminate />}>
        <Routes>
          <Route path={ROUTES.HOME.path} element={<Home />} />
          <Route path={ROUTES.FORGOTTEN_PASSWORD.path} element={<ForgottenPassword />} />
          <Route path={ROUTES.ACCOUNT.path} element={<Account />} />
          <Route path={'*'} element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
