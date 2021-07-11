import React, { useContext, useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { useQuery } from 'react-query';
import { TableContext } from '../contexts/TableContext';
import { ProjectTypeContext } from '../contexts/ProjectTypeContext';
import { SelectedFieldContext } from '../contexts/SelectedFieldContext';
import { getTableFields } from '../services/api';
import FieldsRadioButtons from './FieldsRadioButtons';

//import FieldsCheckBoxes from './FieldsCheckBoxes';

const SideBarFieldRadioButtons = (props) => {
  // when the selectedTable changes - update the list of fields in state

  const { projectType } = useContext(ProjectTypeContext);
  const { selectedTable } = useContext(TableContext);

  //const [selectedField, setSelectedField] = useState();

  const { selectedField, setSelectedField } = useContext(SelectedFieldContext);

  const { data, error, isLoading, isFetching } = useQuery(
    ['getTableFields', projectType, selectedTable],
    () => getTableFields(projectType, selectedTable)
  );

  const [fieldFilter, setFieldFilter] = useState('');

  const contains = (val, filter) => {
    filter = filter ? filter.toUpperCase() : '';
    val = val ? val.toUpperCase() : '';
    if (filter === '') {
      return true;
    } else {
      return val.includes(filter) ? true : false;
    }
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <Segment>
        <Form size="mini">
          <Form.Input
            value={fieldFilter}
            type="text"
            placeholder="Filter fields..."
            onChange={(e) => setFieldFilter(e.target.value)}
          />
        </Form>
      </Segment>
      {data && (
        <div>
          <FieldsRadioButtons
            fields={data.fields.filter((fld) => contains(fld, fieldFilter))}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
          />
        </div>
      )}
    </div>
  );
};

export default SideBarFieldRadioButtons;
