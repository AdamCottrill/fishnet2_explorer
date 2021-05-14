export const filters2args = (filters) => {
  //const filters2 = { PRJ_CD__like: "LHA_IA" };
  const args = {};
  Object.entries(filters.fieldContains).forEach(
    ([key, val]) => (args[`${key}__like`] = val)
  );
  Object.entries(filters.valuesIn).forEach(
    ([key, val]) => (args[`${key}__in`] = val)
  );
  if (filters.notNull) {
    if (filters.notNull.length) {
      args["notNull"] = filters.notNull.join(",");
    }
  }
  return args;
};

export const projectTypes = [
  ["All", "All"],
  ["CFCD", "Catch Sampling"],
  ["IAIS", "Netting"],
  ["IM", "Fishway"],
  ["SC", "Creels"],
  ["SD", "Sport Diary"],
  ["SF", "Sport Fish"],
];
