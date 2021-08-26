import {useRef, useState}          from 'react';
import {Button, Col, Row, Spinner} from 'react-bootstrap';
import {myFetch}                   from '../../../../../module/myFetch';
import BaseTodoForm                from '../../BaseTodoForm';

const NewForm = ({setTodoAry, setFormAlertError}) => {
  const [title, setTitle] = useState();
  const [memo, setMemo] = useState();
  const [isLoading, setIsLoading] = useState();

  const formRef = useRef();

  const submit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const res = await myFetch('/todos', {
      method: 'POST', body: {title, memo}
    });

    if (res.error) {
      setFormAlertError(res);
    } else {
      setTodoAry(ary => [res.todo, ...ary]);

      setFormAlertError({});

      formRef.current.reset();
      setTitle(null);
      setMemo(null);
    }

    setIsLoading(false);
  };

  return (
    <Row id="Todo-Form" className="m-0 mb-4 border">
      <Col id="Base-Todo-Form" className="p-0">
        <BaseTodoForm {...{setTitle, setMemo, isLoading, formRef}}/>
      </Col>

      <Col id="Button-Area" className="align-self-end text-center" xs="2">
        <Button id="Button" disabled={!(title && memo) || isLoading}
                onClick={submit}>
          {isLoading ? <Spinner id="Spinner" animation="border" size="sm"/>
                     : 'TODO!'}
        </Button>
      </Col>
    </Row>
  );
};

export default NewForm;
