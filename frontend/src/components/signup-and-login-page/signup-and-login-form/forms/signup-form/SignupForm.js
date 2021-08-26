import {useEffect, useState} from 'react';
import {Form}                from 'react-bootstrap';
import {myFetch}             from '../../../../../module/myFetch';
import BaseFormGroup         from '../form-parts/BaseFormGroup';
import FormButton            from '../form-parts/FormButton';
import SignupError           from './SignupError';

const SignupForm = ({isLoading, setIsLoading}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [retypePassword, setRetypePassword] = useState();
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [retypePasswordError, setRetypePasswordError] = useState();

  useEffect(() => {
    retypePassword === password ? setRetypePasswordError(null)
                                : setRetypePasswordError('password is wrong');
  }, [password, retypePassword]);

  useEffect(() => { setUsernameError(null); }, [username]);
  useEffect(() => { setPasswordError(null); }, [password]);

  const signup = async e => {
    e.preventDefault();
    setIsLoading(true);

    const res = await myFetch('/users', {
      method: 'POST', body: {username, password}
    });

    if (res.error) {
      assignError(res);

      setIsLoading(false);
    } else {
      await myFetch('/login', {
        method: 'POST', body: {username, password}
      });

      setIsLoading(false);
      window.location.href = '/';
    }
  };

  // 一度の認証処理で確認できる間違いはユーザー名、パスワードどちらか1つである
  // そのため、エラーが出ているかわからないもう片方にnullを設定する
  function assignError(res) {
    if (res.target === 'username') {
      setUsernameError(res.error);
      setPasswordError(null);
    } else {
      setPasswordError(res.error);
      setUsernameError(null);
    }
  }

  return (
    <Form onSubmit={signup}>
      <BaseFormGroup type="username">
        <Form.Control type="text" disabled={isLoading} isInvalid={usernameError}
                      onChange={e => setUsername(e.target.value)}/>

        <SignupError error={usernameError}/>
      </BaseFormGroup>

      <BaseFormGroup type="password">
        <Form.Control type="password" disabled={isLoading} isInvalid={passwordError}
                      onChange={e => setPassword(e.target.value)}/>

        <SignupError error={passwordError}/>
      </BaseFormGroup>

      <BaseFormGroup type="password (retype)">
        <Form.Control type="password" disabled={isLoading} isInvalid={retypePasswordError}
                      onChange={e => setRetypePassword(e.target.value)}/>

        <SignupError error={retypePasswordError}/>
      </BaseFormGroup>

      <FormButton {...{retypePasswordError, username, password, isLoading}}>
        Sign up
      </FormButton>
    </Form>
  );
};

export default SignupForm;
