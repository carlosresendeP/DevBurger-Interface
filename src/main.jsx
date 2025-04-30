import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyles from './styles/GlobalStyles'
import {ToastContainer} from 'react-toastify';

import { BrowserRouter, RouterProvider } from 'react-router-dom';
import {Router} from './routes'
import AppProvider from './hooks';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/stripeConfig.js';
import { ThemeProvider } from 'styled-components';
import {standardTheme} from './styles/Themes/standard.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          {/*<RouterProvider router={router} />*/}
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>
        <GlobalStyles />
        <ToastContainer autoClose={4000} theme='colored'/>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
