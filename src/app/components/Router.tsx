import { Progress } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('@/app/pages/Home'));

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <div className={'app'}>
        <Suspense fallback={<Progress size={'lg'} isIndeterminate />}>
          <Routes>
            <Route path={'/'} element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default Router;
