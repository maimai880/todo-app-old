import {useEffect, useState} from 'react';
import {Col, Row}            from 'react-bootstrap';
import {myFetch}             from '../../../module/myFetch';
import FormAlert             from './FormAlert';
import NewForm               from './list-area/new-form/NewForm';
import TodoList              from './list-area/todo-list/TodoList';
import NewFormModal          from './NewFormModal';
import SideBar               from './side-bar-area/side-bar/SideBar';

const AppArea = ({currentUser}) => {
  const [todoAry, setTodoAry] = useState();
  const [listType, setListType] = useState('TODO');
  const [showNewFormModal, setShowNewFormModal] = useState();
  const [formAlertError, setFormAlertError] = useState();

  useEffect(() => {
    myFetch('todos/list')
      .then(res => {
        setTodoAry(
          res.todoList ? res.todoList.sort((a, b) => {
                         return Date.parse(b.created_at) - Date.parse(a.created_at);
                       })
                       : []);
      });
  }, []);

  return (
    <>
      <Row id="App-Area">
        <Col id="Side-Bar-Area" className="px-0 border-end" xs="auto">
          <SideBar {...{setListType, setShowNewFormModal, currentUser}}/>
        </Col>

        <Col id="List-Area" className="pt-4 px-3 border-end" xs="auto">
          {listType === 'TODO' && <NewForm {...{setTodoAry, setFormAlertError}}/>}

          {todoAry && <TodoList type={listType}
                                {...{todoAry, setTodoAry, setFormAlertError}}/>}

          <p id="Icon-Attribute" className="position-absolute m-0 text-muted">
            Icons made by
            <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons"> Smashicons </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
          </p>
        </Col>
      </Row>

      {showNewFormModal && <NewFormModal{...{
        setTodoAry, setShowNewFormModal,
        setFormAlertError
      }}/>}

      {formAlertError && <FormAlert error={formAlertError} {...{setFormAlertError}}/>}
    </>
  );
};

export default AppArea;
