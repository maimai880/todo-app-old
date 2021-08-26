import {useState}   from 'react';
import EditTodoCard from './cards/EditTodoCard';
import TodoCard     from './cards/TodoCard';

const TodoCardArea = ({todo, setTodoAry, setFormAlertError}) => {
  const [editMode, setEditMode] = useState();

  if (!editMode)
    return <TodoCard {...{...todo, setTodoAry, setEditMode}}/>;
  else
    return <EditTodoCard {...{...todo, setTodoAry, setEditMode, setFormAlertError}}/>;
};

export default TodoCardArea;
