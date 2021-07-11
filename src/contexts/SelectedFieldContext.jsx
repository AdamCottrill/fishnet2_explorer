import { React, createContext, useState } from 'react';

export const SelectedFieldContext = createContext();

const SelectedFieldContextProvider = (props) => {
  const [selectedField, _setSelectedField] = useState();

  const setSelectedField = (field) => _setSelectedField(field);

  return (
    <SelectedFieldContext.Provider
      value={{
        selectedField,
        setSelectedField,
      }}
    >
      {props.children}
    </SelectedFieldContext.Provider>
  );
};

export default SelectedFieldContextProvider;
