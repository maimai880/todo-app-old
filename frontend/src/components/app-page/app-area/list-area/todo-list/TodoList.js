import {useEffect, useState} from 'react';
import {CardColumns}         from 'react-bootstrap';
import TodoCardArea          from './card-area/TodoCardArea';

const TodoList = ({type, todoAry, setTodoAry, setFormAlertError}) => {
  const [list, setList] = useState([null]); // useEffect実行前にnullを返せる

  useEffect(() => {
    if (type === 'TODO') {
      setList(todoAry.filter(x => !x.done));
    } else {
      setList(todoAry.filter(x => x.done)
                     .sort((a, b) => Date.parse(b.done_at) - Date.parse(a.done_at)));
    }
  }, [todoAry, type]);

  if (list.length) {
    return (
      <CardColumns className="w-auto mb-5">
        {list.map(todo => <TodoCardArea key={todo && todo.id}
                                        {...{todo, setTodoAry, setFormAlertError}}/>)}
      </CardColumns>
    );
  } else {
    return (
      <p id="Todo-List-Null-Text" className="text-muted text-center fs-3 mt-5">
        {type === 'TODO' ? 'TODOがまだありません\n作成してみましょう！'
                         : '完了したTODOがまだありません\n頑張ってください！'}
      </p>
    );
  }
};

export default TodoList;
