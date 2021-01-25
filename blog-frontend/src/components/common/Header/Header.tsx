import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Button from 'src/components/common/Button';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('header-content')}>
        <div className={cx('brand')}>
          <Link to="/">Soo Dev-Blog</Link>  
        </div>
        <div className={cx('right')}>
          <Button theme="outline" to="/editor">새 포스트</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;