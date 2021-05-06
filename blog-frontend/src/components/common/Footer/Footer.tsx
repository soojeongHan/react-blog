import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={cx('footer')}>
      <Link to="/" className={cx('brand')}>Soo Dev-Blog</Link>
    </footer>
  );
}

export default Footer;
