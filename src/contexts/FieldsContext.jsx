import { React, createContext, useState } from "react";

export const FieldsContext = createContext();

const FieldsContextProvider = (props) => {
  const [excludedFields, setExcludedFields] = useState([]);

  const setFields = (field) => {
    if (excludedFields.includes(field)) {
      setExcludedFields([...excludedFields.filter((x) => x !== field)]);
    } else {
      setExcludedFields([...excludedFields, field]);
    }
  };

  const resetFields = () => setExcludedFields([]);

  return (
    <FieldsContext.Provider
      value={{
        excludedFields,
        setFields,
        resetFields,
      }}
    >
      {props.children}
    </FieldsContext.Provider>
  );
};

export default FieldsContextProvider;
