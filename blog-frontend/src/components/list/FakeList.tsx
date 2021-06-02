import React from 'react';
import styles from './FakeList.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type FakeListProps = {
  postsLength: number,
}

const FakeList: React.FC<FakeListProps> = ({ postsLength }) => {
  return (
    <div className={cx('fake-wrapper')}>
      <div className={cx('fake-list')}>
        {new Array(postsLength).fill(0).map((_, i) => <div key={i} className={cx('fake-item')} />)}
      </div>
    </div>
  );
}

export default FakeList;
