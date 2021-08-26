import {Nav} from 'react-bootstrap';

const SideBarIcon = ({title, img, setListType, setShowNewFormModal, setShowUserPopup, setSelected}) => {
  let onClick;
  switch (title) {
    case 'TODO': {
      onClick = () => {
        setSelected(title);
        setListType(title);
      };

      break;
    }
    case 'DONE': {
      onClick = () => {
        setSelected(title);
        setListType(title);
      };

      break;
    }
    case 'NEW': {
      onClick = () => setShowNewFormModal(true);

      break;
    }
    case 'USER': {
      onClick = () => setShowUserPopup(true);
    }
  }

  return (
    <Nav.Link className="d-flex justify-content-center" active onClick={onClick}>
      <img id="Side-Bar-Icon" src={img} alt="icon" width="115%"/>
    </Nav.Link>
  );
};

export default SideBarIcon;
