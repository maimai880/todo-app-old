import {Form} from 'react-bootstrap';

const SignupError = ({error}) => {
  let errorText;
  switch (error) {
    case 'username is too short': {
      errorText = 'ユーザー名は1文字以上入力してください';
      break;
    }
    case 'username is too long': {
      errorText = 'ユーザー名は15文字以内で入力してください';
      break;
    }
    case 'username includes invalid character': {
      errorText = 'ユーザー名は半角英数で入力してください';
      break;
    }
    case 'user is already exits': {
      errorText = 'そのユーザー名は既に使われています';
      break;
    }
    case 'password is too short': {
      errorText = 'パスワードは8文字以上入力してください';
      break;
    }
    case 'password is too long': {
      errorText = 'パスワードは72文字未満で入力してください';
      break;
    }
    case 'password include invalid character': {
      errorText = 'パスワードに使えない文字を含まないでください';
      break;
    }
    case 'password doesn\'t include alphabet or number': {
      errorText = 'パスワードにはアルファベットと数字の両方を含んでください';
      break;
    }
    case 'password is wrong': {
      errorText = '正しいパスワードを入力してください';
      break;
    }
    default: {
      errorText = null;
    }
  }

  return (
    <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
  );
};

export default SignupError;
