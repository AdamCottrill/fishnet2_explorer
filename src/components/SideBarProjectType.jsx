import React, { useState } from "react";

import { Form, Radio } from "semantic-ui-react";

const SideBarProjectType = (props) => {
  const [projectType, setProjectType] = useState("All");

  const handleChange = (event, { value }) => {
    setProjectType(value);
  };

  const projectTypes = [
    ["All", "All"],
    ["CDCF", "Catch Sampling"],
    ["IAIS", "Netting"],
    ["IM", "Fishway"],
    ["SC", "Creels"],
    ["SD", "Sport Diary"],
    ["SF", "Sport Fish"],
  ];

  return (
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
  );
};

export default SideBarProjectType;
