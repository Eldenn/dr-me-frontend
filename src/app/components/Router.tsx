import { Progress } from '@chakra-ui/react';
import React, { FC, lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from '@/app/constants/navigation';
import { useAuth } from '@/app/providers/AuthProvider';

const Home = lazy(() => import('@/app/pages/Home'));
const ForgottenPassword = lazy(() => import('@/app/pages/ForgottenPassword'));
const Account = lazy(() => import('@/app/pages/Account'));

const Router: FC = () => {
  const { isAuthenticated } = useAuth();

  const protectedRoutes = useMemo(() => {
    if (isAuthenticated) {
      return (
        <Routes>
          <Route path={ROUTES.ACCOUNT.path} element={<Account />} />
          <Route path={'*'} element={<Account />} />
        </Routes>
      );
    }
  }, [isAuthenticated]);

  const publicRoutes = useMemo(() => {
    if (!isAuthenticated) {
      return (
        <Routes>
          <Route path={ROUTES.HOME.path} element={<Home />} />
          <Route path={ROUTES.FORGOTTEN_PASSWORD.path} element={<ForgottenPassword />} />
          <Route path={'*'} element={<Home />} />
        </Routes>
      );
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Progress size={'lg'} isIndeterminate />}>
        {protectedRoutes}
        {publicRoutes}
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
