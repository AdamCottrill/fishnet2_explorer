import { React, createContext, useState } from "react";

export const TableContext = createContext();

const TableContextProvider = (props) => {
  const initialValues = "FN011";

  const [selectedTable, setTable] = useState(initialValues);

  const setSelectedTable = (tablename) => setTable(tablename);

  return (
    <TableContext.Provider
      value={{
        selectedTable,
        setSelectedTable,
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
