import {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import LoginForm  from './forms/login-form/LoginForm';
import SignupForm from './forms/signup-form/SignupForm';

const SignupAndLoginForm = () => {
  const [isLoading, setIsLoading] = useState();

  return (
    <Row id="Signup-And-Login-Form" className="border shadow-lg">
      <Col className="p-0" sm="6" xs="12">
        <h2 className="text-center mb-4">Signup</h2>

        <div id="Signup-Form" className="px-4 border-end">
          <SignupForm {...{isLoading, setIsLoading}}/>
        </div>
      </Col>

      <Col className="p-0" sm="6" xs="12">
        <h2 className="text-center mb-4">Login</h2>

        <div className="px-4">
          <LoginForm {...{isLoading, setIsLoading}}/>
        </div>
      </Col>
    </Row>
  );
};

export default SignupAndLoginForm;
