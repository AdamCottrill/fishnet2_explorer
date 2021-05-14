import React, { useContext } from "react";

import { ProjectTypeContext } from "../contexts/ProjectTypeContext";
import { Segment, Form, Radio } from "semantic-ui-react";

import { projectTypes } from "../utils";

const SideBarProjectType = (props) => {
  //const [projectType, setProjectType] = useState("All");

  const { projectType, setProjectType } = useContext(ProjectTypeContext);

  const handleChange = (event, { value }) => {
    setProjectType(value);
  };

  return (
    <Segment basic>
      <Form size="mini" style={{ textAlign: "left" }}>
        {projectTypes.map(([ptype, label]) => (
          <Form.Field key={ptype}>
            <Radio
              label={label}
              name="projetTypeGroup"
              value={ptype}
              checked={projectType === ptype}
              onChange={handleChange}
            />
          </Form.Field>
        ))}
      </Form>
    </Segment>
  );
};

export default SideBarProjectType;
