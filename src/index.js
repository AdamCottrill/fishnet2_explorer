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

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <TableContextProvider>
      <FieldsContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </FieldsContextProvider>
    </TableContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
