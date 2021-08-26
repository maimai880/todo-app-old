import {useEffect, useState} from 'react';
import {Fade, Form}          from 'react-bootstrap';
import {myFetch}             from '../../../../../module/myFetch';
import BaseFormGroup         from '../form-parts/BaseFormGroup';
import FormButton            from '../form-parts/FormButton';

const LoginForm = ({isLoading, setIsLoading}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => setError(null), [username, password]);

  const login = async e => {
    e.preventDefault();
    setIsLoading(true);

    const res = await myFetch('/login', {
      method: 'POST', body: {username, password}
    });

    if (res.error) {
      setError(res.error);

      setIsLoading(false);
    } else {
      setIsLoading(false);
      window.location.href = '/';
    }
  };

  return (
    <Form onSubmit={login}>
      <BaseFormGroup type="username">
        <Form.Control type="text" disabled={isLoading} isInvalid={error}
                      onChange={e => setUsername(e.target.value)}/>
      </BaseFormGroup>

      <BaseFormGroup type="password">
        <Form.Control type="password" disabled={isLoading} isInvalid={error}
                      onChange={e => setPassword(e.target.value)}/>
      </BaseFormGroup>

      <Fade in={error}>
        <p id="Login-Feedback" className="mb-4 text-center text-nowrap">
          ユーザーネームかパスワードが間違っています
        </p>
      </Fade>

      <FormButton {...{username, password, isLoading}}>
        Log in
      </FormButton>
    </Form>
  );
};

export default LoginForm;
