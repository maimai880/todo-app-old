import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import AppPage               from './components/app-page/AppPage';
import SignupAndLoginPage    from './components/signup-and-login-page/SignupAndLoginPage';
import {myFetch}             from './module/myFetch';

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    myFetch('/users')
      .then(res => { if (res.username) setCurrentUser(res.username); });
  }, []);

  if (currentUser)
    return <AppPage {...{currentUser}}/>;
  else
    return <SignupAndLoginPage/>;
};

export default App;
