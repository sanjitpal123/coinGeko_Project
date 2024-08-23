import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/SharingComponent';
import Provider from './Contextstore/Store';
import ResponsiveLoaders from './Component/Spinner'; 
import CustomError from './ErrorHandling/Error';

const HomePage = lazy(() => import('./Component/HomePage'));
const CoinfoPage = lazy(() => import('./Component/CoinInfoPage'));

function App() {
  return (
      <Provider>
            <CustomError>

        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<ResponsiveLoaders />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="details/:coinId"
                element={
                  <Suspense fallback={<ResponsiveLoaders />}>
                    <CoinfoPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
        </CustomError>
      </Provider>
  
  );
}

export default App;
