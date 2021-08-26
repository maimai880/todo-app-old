import {useEffect, useState} from 'react';
import {Alert}               from 'react-bootstrap';

const FormAlert = ({error, setFormAlertError}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [errorText, setErrorText] = useState();
  const [variant, setVariant] = useState();

  useEffect(() => {
    //errorが設定されるたびタイムアウトの削除、再設定が行われる
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => setFormAlertError(null), 2000)
    );

    switch (error.error) {
      case 'str is empty': {
        setErrorText(`${error.target}は1文字以上入力してください`);
        setVariant('danger');

        break;
      }
      case 'str is too long': {
        setErrorText(`${error.target}は140文字以内で入力して下さい`);
        setVariant('danger');

        break;
      }
      case 'same todo is already exists': {
        setErrorText('そのTODOは既に存在します');
        setVariant('danger');

        break;
      }
      case undefined: {
        setErrorText('投稿されました！');
        setVariant('success');

        break;
      }
      default: {
        setErrorText('エラーが発生しました。リロードしてください');
        setVariant('danger');
      }
    }
  }, [error]);

  return (
    <Alert id="Form-Alert" className="bottom-0 mb-2" show={error} {...{variant}}>
      {errorText}
    </Alert>
  );
};

export default FormAlert;
