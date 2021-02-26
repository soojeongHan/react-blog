import React from 'react';
import { useDispatch } from 'react-redux';
import LoginModalContainer from 'src/containers/LoginModalContainer';
import { reqCheckLogin, tempLogin } from 'src/redux/modules/base';

type BaseProps = {

}

const Base: React.FC<BaseProps> = () => {
  const dispatch = useDispatch();

  const initialize = () => {
    // 로그인 상태 확인
    if (localStorage.logged === "true") {
      dispatch(tempLogin());
    }
    dispatch(reqCheckLogin());
  }

  React.useLayoutEffect(() => {
    initialize();
  });

  return (
    <>
      <LoginModalContainer />
    </>
  );
}

export default Base;
