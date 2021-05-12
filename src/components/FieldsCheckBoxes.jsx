import React, { useContext } from "react";
import { Form } from "semantic-ui-react";

import { FieldsContext } from "../contexts/FieldsContext";

const FieldsCheckBoxes = (props) => {
  const { fields, toggleFieldState } = props;

  const { excludedFields } = useContext(FieldsContext);

  return (
    <Form style={{ textAlign: "left" }} size="mini">
      {fields.map((field) => (
        <Form.Checkbox
          size="mini"
          key={field}
          label={field}
          value={field}
          checked={excludedFields.includes(field)}
          onChange={() => toggleFieldState(field)}
        />
      ))}
    </Form>
  );
};

export default FieldsCheckBoxes;
