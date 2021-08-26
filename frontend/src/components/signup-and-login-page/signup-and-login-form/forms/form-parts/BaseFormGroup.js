import {Form} from 'react-bootstrap';

const BaseFormGroup = ({type, children}) => {
  return (
    <Form.Group id={type === 'password (retype)' && 'Retype-Password-Area'}
                className={type !== 'password (retype)' && 'mb-4'}>
      <Form.Label>{type}</Form.Label>

      {children}
    </Form.Group>
  );
};

export default BaseFormGroup;
