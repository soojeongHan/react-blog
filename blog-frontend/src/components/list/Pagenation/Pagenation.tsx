import React from 'react';
import styles from './Pagenation.scss';
import classNames from 'classnames/bind';
import Button from 'src/components/common/Button';

const cx = classNames.bind(styles);

type PagenationProps = {

}

const Pagenation: React.FC<PagenationProps> = () => {
  return (
    <div className={cx('pagenation')}>
      <Button disabled to="/">
        이전 페이지
      </Button>
      <div className={cx('number')}>
        페이지 1
      </div>
      <Button to="/">
        다음 페이지
      </Button>
    </div>
  );
}

export default Pagenation;
