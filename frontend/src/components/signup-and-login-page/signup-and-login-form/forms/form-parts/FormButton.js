import {Button, Spinner} from 'react-bootstrap';

const FormButton = ({retypePasswordError, username, password, isLoading, children}) => {
  const isDisable = retypePasswordError || !(username && password) || isLoading;

  return (
    <Button id="Button" className="d-block m-auto mb-2" type="submit" disabled={isDisable}>
      {isLoading ? <Spinner className="mx-auto" animation="border" size="sm"/>
                 : children}
    </Button>
  );
};

export default FormButton;
