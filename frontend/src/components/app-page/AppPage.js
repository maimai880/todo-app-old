import {useEffect} from 'react';
import '../../app-page.css';
import AppArea     from './app-area/AppArea';

const AppPage = ({currentUser}) => {
  useEffect(() => {
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = 'white';
  }, []);

  return (
    <AppArea {...{currentUser}}/>
  );
};

export default AppPage;
