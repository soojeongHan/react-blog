import React from 'react';
import Button from 'src/components/common/Button';
import styles from './List.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type PagenationProps = {
  lastPage: number,
  createPagePath: (page: number) => void,
  page: number,
}

const Pagenation: React.FC<PagenationProps> = ({ lastPage, createPagePath, page }) => {
  return (
    <div className={cx('pagenation')}>
      <Button disabled={page - 1 > 0 ? false : true} to={createPagePath(page - 1)}>
        Previous Page
      </Button>
      <div className={cx('number')}>
        Page {page}
      </div>
      <Button disabled={page + 1 > lastPage ? true : false} to={createPagePath(page + 1)}>
        Next Page
      </Button>
    </div>
  );
}

export default Pagenation;
