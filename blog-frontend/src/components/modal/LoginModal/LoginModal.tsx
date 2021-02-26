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
        <div className={cx('title')}>로그인</div>
        <div className={cx('description')}>관리자 비밀번호를 입력하세요.</div>
        <input autoFocus type="password" placeholder="비밀번호 입력" value={password} onChange={(e) => onChange(e)} onKeyPress={onKeyPress} />
        {error && <div className={cx('error')}>로그인 실패</div>}
        <div className={cx('login')} onClick={onLogin}>로그인</div>
      </div>
    </ModalWrapper>
  );
}

export default LoginModal;
