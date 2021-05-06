import React from 'react';
import LoginModalContainer from 'src/containers/LoginModalContainer';
import { useDispatch } from 'react-redux';
import { reqCheckLogin } from 'src/redux/modules/base';

type BaseProps = {

}

const Base: React.FC<BaseProps> = () => {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    const initialize = async () => {
      const logged = localStorage.getItem('logged');
      if (!logged) return;

      try {
        dispatch(reqCheckLogin());
      } catch (e) {
        localStorage.removeItem('logged');
      }
    }
    initialize();
  });
  return (
    <>
      <LoginModalContainer />
    </>
  );
}

export default Base;
