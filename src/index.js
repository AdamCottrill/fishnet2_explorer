import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './index.css';
import App from './App';

//import AppContextProvider from "./Context";

import FieldsContextProvider from './contexts/FieldsContext';
import SelectedContextProvider from './contexts/SelectedContext';
import FiltersContextProvider from './contexts/FiltersContext';

import theme from "./theme"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //refetchOnMount: false,
      refetchInterval: Infinity,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
        <FieldsContextProvider>
          <FiltersContextProvider>
            <SelectedContextProvider>
              <QueryClientProvider client={queryClient}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <App />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </SelectedContextProvider>
          </FiltersContextProvider>
        </FieldsContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
