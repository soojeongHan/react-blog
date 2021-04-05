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
      <div className={cx('admin-login')} onClick={onLoginClick}>Admin {logged ? 'Logout' : 'Login'}</div>
    </footer>
  );
}

export default Footer;
