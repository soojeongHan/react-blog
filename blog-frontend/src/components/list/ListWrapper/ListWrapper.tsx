import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type ListWrapperProps = {
  children: React.ReactNode;
}

const ListWrapper: React.FC<ListWrapperProps> = ({children}) => {
  return (
    <div className={cx('list-wrapper')}>
      {children}
    </div>
  );
}

export default ListWrapper;
