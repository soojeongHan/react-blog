import React from 'react';
import LoginModalContainer from 'src/containers/LoginModalContainer';

type BaseProps = {

}

const Base: React.FC<BaseProps> = () => {
  const initialize = async () => {
    // 로그인 상태 확인
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
