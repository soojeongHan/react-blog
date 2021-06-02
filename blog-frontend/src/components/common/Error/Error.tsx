import React from 'react';
import classNames from 'classnames/bind';
import styles from './Error.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type ErrorProps = {
}

const Error: React.FC<ErrorProps> = () => {
  return (
    <div className={cx('error-page')}>
      <div className={cx('error-text')}>요청하신 페이지를 찾을 수 없습니다.</div>
      <div className={cx('error-link')}><Link to="/">홈으로</Link></div>
    </div>
  );
}

export default Error;
