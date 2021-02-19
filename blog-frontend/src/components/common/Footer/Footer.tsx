import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface FooterProps {
  onLoginClick: () => void,
  logged: boolean,
}

const Footer: React.FC<FooterProps> = ({ onLoginClick, logged }) => {
  return (
    <footer className={cx('footer')}>
      <Link to="/" className={cx('brand')}>Soo Dev-Blog</Link>
      <div className={cx('admin-login')} onClick={onLoginClick}>관리자 {logged ? '로그아웃' : '로그인'}</div>
    </footer>
  );
}

export default Footer;
