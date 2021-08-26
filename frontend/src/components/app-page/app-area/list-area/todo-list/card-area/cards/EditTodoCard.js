import {useState}                        from 'react';
import {Button, Card, Col, Row, Spinner} from 'react-bootstrap';
import {myFetch}                         from '../../../../../../../module/myFetch.js';
import BaseTodoForm                      from '../../../../BaseTodoForm.js';

const EditTodoCard = ({id, title, memo, setTodoAry, setEditMode, setFormAlertError}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newMemo, setNewMemo] = useState(memo);
  const [isLoading, setIsLoading] = useState();

  const submit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const res = await myFetch(`todos/${id}`, {
      method: 'PUT', body: {title: newTitle, memo: newMemo}
    });

    if (res.error) {
      setFormAlertError(res);
    } else {
      setTodoAry(ary => {
        const i = ary.findIndex(x => x.id === id);

        ary[i].title = newTitle;
        ary[i].memo = newMemo;

        return ary;
      });

      setFormAlertError({});
    }

    setIsLoading(false);

    setEditMode(res.error); // エラーがあればエディットモードのまま
  };

  return (
    <Card className="m-0">
      <Row id="Todo-Form" className="m-0">
        <Col id="Base-Todo-Form" className="p-0">
          <BaseTodoForm setTitle={setNewTitle} setMemo={setNewMemo}
                        defaultTitle={title} defaultMemo={memo} {...{isLoading}}/>
        </Col>

        <Col id="Button-Area" className="align-self-end text-center" xs="2">
          <Button id="Button" className="mb-2" variant="secondary"
                  disabled={isLoading} onClick={() => setEditMode(false)}>
            Cancel
          </Button>

          <Button id="Button" onClick={submit}
                  disabled={
                    !(newTitle && newMemo)
                    || (newTitle === title && newMemo === memo)
                    || isLoading
                  }>
            {isLoading ? <Spinner id="Spinner" animation="border" size="sm"/>
                       : 'EDIT'}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default EditTodoCard;
