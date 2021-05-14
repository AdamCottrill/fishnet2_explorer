import { React, createContext, useState } from "react";

export const ProjectTypeContext = createContext();

const ProjectTypeContextProvider = (props) => {
  const initialValues = "IAIS";

  const [projectType, _setProjectType] = useState(initialValues);

  const setProjectType = (dbasename) => _setProjectType(dbasename);

  return (
    <ProjectTypeContext.Provider
      value={{
        projectType,
        setProjectType,
      }}
    >
      {props.children}
    </ProjectTypeContext.Provider>
  );
};

export default ProjectTypeContextProvider;
