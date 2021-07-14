import { React, createContext, useState } from 'react';

export const SelectedContext = createContext();

const SelectedContextProvider = (props) => {
  //Get these from the url query parameters eventually
  const initialValues = {
    projectType: 'IAIS',
    table: 'FN011',
    field: '',
  };

  const [selected, _setSelected] = useState(initialValues);

  const setSelected = (key, value) => {
    _setSelected({ ...selected, [key]: value });
  };

  return (
    <SelectedContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {props.children}
    </SelectedContext.Provider>
  );
};

export default SelectedContextProvider;
