import {Card, Col, Row} from 'react-bootstrap';
import deleteIcon       from '../../../../../../../images/delete.png';
import doneIcon         from '../../../../../../../images/done.png';
import editIcon         from '../../../../../../../images/edit.png';
import notDoneIcon      from '../../../../../../../images/not-done.png';
import {myFetch}        from '../../../../../../../module/myFetch.js';

const TodoCard = ({id, title, memo, done, created_at, done_at, setTodoAry, setEditMode}) => {
  const deleteTodo = () => {
    myFetch(`todos/${id}`, {method: 'DELETE'});

    setTodoAry(ary => ary.filter(x => x.id !== id));
  };

  const toggleDone = () => {
    myFetch(`todos/${id}/done`, {method: 'PUT'});

    // aryを更新してreturnしても反映されないのでコピーを返す
    setTodoAry(ary => {
      const tmp = Array.from(ary);

      const i = tmp.findIndex(x => x.id === id);
      tmp[i].done = !done;
      tmp[i].done_at = done ? null : new Date().toJSON();

      return tmp;
    });
  };

  return (
    <Card id="Todo-Card">
      <Row>
        <Col xs="9">
          <Card.Title className="fs-3 ms-3 mt-1">
            {title}
            {done || <img id="Edit-Button" width="4%" src={editIcon} alt="edit"
                          onClick={() => setEditMode(true)}/>}
          </Card.Title>

          <Card.Body id="Body" className="py-1 pe-0 position-relative">
            <div className="mb-3">{memo}</div>
            {done ? <p id="Date" className="text-muted">{`完了: ${new Date(done_at).toLocaleString()}`}</p>
                  : <p id="Date" className="text-muted">{`投稿: ${new Date(created_at).toLocaleString()}`}</p>}
          </Card.Body>
        </Col>

        <Col className="d-flex align-items-center" xs="3">
          <div id="Delete-Button" className="w-50 text-center">
            <img width="95%" src={deleteIcon} alt="delete" onClick={deleteTodo}/>
          </div>
          <div id="Done-Button" className="w-50 text-center">
            {done ? <img width="95%" src={notDoneIcon} alt="notDone" onClick={toggleDone}/>
                  : <img width="95%" src={doneIcon} alt="done" onClick={toggleDone}/>}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default TodoCard;
