import {useState}           from 'react';
import {Nav}                from 'react-bootstrap';
import selectedDonelistIcon from '../../../../../images/donelist-selected.png';
import donelistIcon         from '../../../../../images/donelist.png';
import newIcon              from '../../../../../images/new.png';
import selectedTodolistIcon from '../../../../../images/todolist-selected.png';
import todolistIcon         from '../../../../../images/todolist.png';
import userIcon             from '../../../../../images/user.png';
import SideBarIcon          from './SideBarIcon';
import UserPopup            from './UserPopup';

const SideBar = ({setListType, setShowNewFormModal, currentUser}) => {
  const [showUserPopup, setShowUserPopup] = useState();
  const [selected, setSelected] = useState('TODO');

  const id = 'Side-Bar-Icon-Area';

  return (
    <Nav id="Side-Bar" className="flex-column position-sticky top-0">
      <Nav.Item>
        <h2 id="Brand" className="text-center">TODO<br/>APP</h2>
      </Nav.Item>

      <Nav.Item {...{id}}>
        <SideBarIcon title="TODO" {...{setListType, setSelected}}
                     img={selected === 'TODO' ? selectedTodolistIcon : todolistIcon}/>
      </Nav.Item>

      <Nav.Item {...{id}}>
        <SideBarIcon title="DONE" {...{setListType, setSelected}}
                     img={selected === 'DONE' ? selectedDonelistIcon : donelistIcon}/>
      </Nav.Item>

      <Nav.Item {...{id}}>
        <SideBarIcon title="NEW" {...{setShowNewFormModal}} img={newIcon}/>
      </Nav.Item>

      <Nav.Item {...{id}} className="position-relative">
        <SideBarIcon title="USER" {...{setShowUserPopup}} img={userIcon}/>

        {showUserPopup && <UserPopup username={currentUser}
                                     {...{showUserPopup, setShowUserPopup}}/>}
      </Nav.Item>
    </Nav>
  );
};

export default SideBar;
