import React from 'react';
import { useDispatch } from 'react-redux';
import Footer from 'src/components/common/Footer';
import { showModal } from 'src/redux/modules/base';

type FooterContainerProps = {

}

const FooterContainer: React.FC<FooterContainerProps> = () => {
  const dispatch = useDispatch();
  const handleLoginClick = async () => {
    dispatch(showModal('login'));
  }
  return (
    <Footer onLoginClick={handleLoginClick} />
  );
}

export default FooterContainer;
