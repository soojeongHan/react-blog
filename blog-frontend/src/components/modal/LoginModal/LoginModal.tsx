import React, { ChangeEvent } from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const cx = classNames.bind(styles);


type LoginModalProps = {
  visible: boolean,
  password: string,
  error: boolean,
  onCancel: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onLogin: () => void,
}

const LoginModal: React.FC<LoginModalProps> = ({
  visible, password, error, onCancel, onChange, onKeyPress, onLogin
}) => {
  return (
    <ModalWrapper visible={visible}>
      <div className={cx('form')}>
        <div className={cx('close')} onClick={onCancel}>&times;</div>
        <div className={cx('title')}>Login</div>
        <div className={cx('description')}>Enter Admin Password</div>
        <input autoFocus type="password" placeholder="password" value={password} onChange={(e) => onChange(e)} onKeyPress={onKeyPress} />
        {error && <div className={cx('error')}>Fail Login</div>}
        <div className={cx('login')} onClick={onLogin}>Login</div>
      </div>
    </ModalWrapper>
  );
}

export default LoginModal;
