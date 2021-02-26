import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from 'src/components/modal/LoginModal/LoginModal';
import { RootState } from 'src/redux/modules/rootReducer';
import * as BaseAction from 'src/redux/modules/base'
import { push } from 'connected-react-router';

type LoginModalContainerProps = {

}

const LoginModalContainer: React.FC<LoginModalContainerProps> = () => {
  // State, Dispatch
  const dispatch = useDispatch();
  const visible = useSelector<RootState, boolean>(state => state.base.modal.login);
  const password = useSelector<RootState, string>(state => state.base.loginModal.password);
  const error = useSelector<RootState, boolean>(state => state.base.loginModal.error);

  // Function
  const handleLogin = async () => {
    try {
      await dispatch(BaseAction.reqLogin(password));
      await push('/');
      localStorage.logged = "true";
    }
    catch (e) {
      console.error(e);
    }
  }
  const handleCancel = () => {
    dispatch(BaseAction.hideModal('login'));
    dispatch(BaseAction.changePasswordInput(''));
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(BaseAction.changePasswordInput(e.target.value));
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin();
  }

  // render
  return (
    <LoginModal onCancel={handleCancel} password={password} visible={visible} onChange={handleChange} onLogin={handleLogin} onKeyPress={handleKeyPress} error={error} />
  );
}

export default LoginModalContainer;
