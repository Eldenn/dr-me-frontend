import { Progress } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from '@/app/constants/navigation';

const Home = lazy(() => import('@/app/pages/Home'));
const ForgottenPassword = lazy(() => import('@/app/pages/ForgottenPassword'));

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <div className={'app'}>
        <Suspense fallback={<Progress size={'lg'} isIndeterminate />}>
          <Routes>
            <Route path={ROUTES.HOME.path} element={<Home />} />
            <Route path={ROUTES.FORGOTTEN_PASSWORD.path} element={<ForgottenPassword />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default Router;
