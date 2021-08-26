import {useEffect, useRef} from 'react';
import {Button}            from 'react-bootstrap';
import {myFetch}           from '../../../../../module/myFetch';

const UserPopup = ({username, setShowUserPopup}) => {
  const userPopupRef = useRef();

  useEffect(() => {
    document.addEventListener('click', function handleDocumentClick(e) {
      // クリック対象がUserPopup自身だった場合
      if (userPopupRef.current.contains(e.target)) return;

      setShowUserPopup(false);
      document.removeEventListener('click', handleDocumentClick);
    });
  }, []);

  const logout = async () => {
    await myFetch('/logout');

    window.location.href = '/';
  };

  return (
    <div id="User-Popup" className="p-2 border shadow" ref={userPopupRef}>
      <p className="me-5 text-nowrap">
        <b>{username}</b>でログイン中
      </p>
      <Button className="float-end" variant="secondary" onClick={logout}>
        ログアウト
      </Button>
    </div>
  );
};

export default UserPopup;
