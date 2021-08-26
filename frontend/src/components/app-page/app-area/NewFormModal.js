import {useRef, useState} from 'react';
import {Button, Spinner}  from 'react-bootstrap';
import {myFetch}          from '../../../module/myFetch';
import BaseTodoForm       from './BaseTodoForm';

const NewFormModal = ({setTodoAry, setShowNewFormModal, setFormAlertError}) => {
  const [title, setTitle] = useState();
  const [memo, setMemo] = useState();
  const [isLoading, setIsLoading] = useState();

  const modalRef = useRef();

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

      setShowNewFormModal(false);
    }

    setIsLoading(false); // elseに行っても実行される
  };

  const onClick = e => {
    if (modalRef.current.contains(e.target)) return; // クリック対象がModalだった場合

    setShowNewFormModal(false);
  };

  return (
    <div id="Modal-Overlay" {...{onClick}}>
      <div id="New-Form-Modal" ref={modalRef}>
        <div className="border-bottom py-3 px-3">
          <h3>Create New TODO</h3>
        </div>

        <div id="Modal-Todo-Form" className="border-bottom">
          <BaseTodoForm {...{setTitle, setMemo, isLoading}}/>
        </div>

        <div className="py-2 pe-3 text-end">
          <Button id="Button" disabled={!(title && memo) || isLoading}
                  onClick={submit}>
            {isLoading ? <Spinner animation="border" size="sm"/>
                       : 'TODO!'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFormModal;
