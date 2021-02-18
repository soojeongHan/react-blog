import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface FooterProps {
  onLoginClick: () => void,
}

const Footer: React.FC<FooterProps> = ({ onLoginClick }) => {
  return (
    <footer className={cx('footer')}>
      <Link to="/" className={cx('brand')}>Soo Dev-Blog</Link>
      <div className={cx('admin-login')} onClick={onLoginClick}>관리자 로그인</div>
    </footer>
  );
}

export default Footer;
