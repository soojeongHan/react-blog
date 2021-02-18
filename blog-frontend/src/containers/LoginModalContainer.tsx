import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from 'src/components/modal/LoginModal/LoginModal';
import { RootState } from 'src/redux/modules/rootReducer';
import * as BaseAction from 'src/redux/modules/base'

type LoginModalContainerProps = {

}

const LoginModalContainer: React.FC<LoginModalContainerProps> = () => {
  const dispatch = useDispatch();
  const visible = useSelector<RootState, boolean>(state => state.base.modal.login);
  const password = useSelector<RootState, string>(state => state.base.loginModal.password);
  const error = useSelector<RootState, boolean>(state => state.base.loginModal.error);

  const handleLogin = async () => {
    try {
      await dispatch(BaseAction.reqLogin(password));
      console.log('login', password);
      handleCancel();
    }
    catch (e) {
      console.error(e);
    }
  }
  const handleCancel = () => {
    dispatch(BaseAction.hideModal('login'));
    dispatch(BaseAction.changePasswordInput(''));
  }
  const handleChange = (e: any) => {
    dispatch(BaseAction.changePasswordInput(e.target.value));
  }
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') handleLogin();
  }
  return (
    <LoginModal onCancel={handleCancel} password={password} visible={visible} onChange={handleChange} onLogin={handleLogin} onKeyPress={handleKeyPress} error={error} />
  );
}

export default LoginModalContainer;
