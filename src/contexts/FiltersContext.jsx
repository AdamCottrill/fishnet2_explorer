import { React, createContext, useState } from "react";

export const FiltersContext = createContext();

const FiltersContextProvider = (props) => {
  const initialValues = {
    valuesIn: {},
    fieldContains: {},
    notNull: [],
  };

  const [filters, setFilters] = useState(initialValues);

  const setNotNull = (field) => {
    const { notNull } = filters;
    if (notNull.includes(field)) {
      setFilters({
        ...filters,
        notNull: [...notNull.filter((x) => x !== field)],
      });
    } else {
      setFilters({ ...filters, notNull: [...notNull, field] });
    }
  };

  const delNotNull = (field) => {
    const { notNull } = filters;
    setFilters({
      ...filters,
      notNull: [...notNull.filter((x) => x !== field)],
    });
  };

  const setFieldContains = (fields) => {
    setFilters({ ...filters, fieldContains: { ...fields } });
  };

  const delFieldContains = (field) => {
    const values = { ...filters.fieldContains };
    delete values[field];
    setFilters({ ...filters, fieldContains: { ...values } });
  };

  const setValuesIn = (fields) => {
    setFilters({ ...filters, valuesIn: { ...fields } });
  };

  const delValuesIn = (field) => {
    const values = { ...filters.valuesIn };
    delete values[field];
    setFilters({ ...filters, valuesIn: { ...values } });
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setNotNull,
        delNotNull,
        setFieldContains,
        delFieldContains,
        setValuesIn,
        delValuesIn,
      }}
    >
      {props.children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;
