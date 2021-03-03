import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from 'src/components/common/Footer';
import { initializeLoginModal, reqLogout, showModal } from 'src/redux/modules/base';
import { RootState } from 'src/redux/modules/rootReducer';

type FooterContainerProps = {

}

const FooterContainer: React.FC<FooterContainerProps> = () => {

  const dispatch = useDispatch();
  const logged = useSelector<RootState, boolean>(state => state.base.logged);
  const handleLoginClick = async () => {
    // login 상태일 때
    if (logged) {
      try {
        await dispatch(reqLogout());
        localStorage.removeItem('logged');
        window.location.reload();
      }
      catch (e) {
        console.error(e);
      }
    }
    // logout 상태일 때
    else {
      dispatch(showModal('login'));
      dispatch(initializeLoginModal());
    }
  }
  return (
    <Footer onLoginClick={handleLoginClick} logged={logged} />
  );
}

export default FooterContainer;
