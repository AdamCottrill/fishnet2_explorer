import React, { useContext } from 'react';
import { Form, Radio } from 'semantic-ui-react';

import { SelectedFieldContext } from '../contexts/SelectedFieldContext';

const FieldsRadioButtons = (props) => {
  const { fields } = props;

  const { selectedField, setSelectedField } = useContext(SelectedFieldContext);

  return (
    <Form style={{ textAlign: 'left' }} size="mini">
      {fields.map((field) => (
        <Form.Field>
          <Radio
            label={field}
            name="fieldGroup"
            value={field}
            checked={field === selectedField ? true : false}
            onChange={() => setSelectedField(field)}
          />
        </Form.Field>
      ))}
    </Form>
  );
};

export default FieldsRadioButtons;
