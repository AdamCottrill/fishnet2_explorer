import React from "react";
import ReactDOM from "react-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "semantic-ui-css/semantic.min.css";

import "./index.css";
import App from "./App";

//import AppContextProvider from "./Context";
import TableContextProvider from "./contexts/TableContext";
import FieldsContextProvider from "./contexts/FieldsContext";
import FiltersContextProvider from "./contexts/FiltersContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <TableContextProvider>
      <FieldsContextProvider>
        <FiltersContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </FiltersContextProvider>
      </FieldsContextProvider>
    </TableContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
