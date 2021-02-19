import React from 'react';
import { useDispatch } from 'react-redux';
import LoginModalContainer from 'src/containers/LoginModalContainer';
import { reqCheckLogin, tempLogin } from 'src/redux/modules/base';

type BaseProps = {

}

const Base: React.FC<BaseProps> = () => {
  const dispatch = useDispatch();

  const initialize = async () => {
    // 로그인 상태 확인
    if (localStorage.logged === "true") {
      dispatch(tempLogin());
    }
    dispatch(reqCheckLogin());
  }

  React.useLayoutEffect(() => {
    initialize();
  })

  return (
    <>
      <LoginModalContainer />
      {/* 전역적으로 사용되는 컴포넌트들은 여기서 렌더링한다. */}
    </>
  );
}

export default Base;
