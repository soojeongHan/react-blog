import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames';
import Button from 'src/components/common/Button';

const cx = classNames.bind(styles);

type HeaderType = {
  isEditing: boolean;
  postId?: string;
  goHomepage: () => void;
  handleRemove: () => void;
}

const Header: React.FC<HeaderType> = ({ isEditing, postId, goHomepage, handleRemove }) => {
  return (
    <header className={cx('header')}>
      <div className={cx('header-content')}>
        <div className={cx('brand')}>
          <div onClick={goHomepage}>Soo Dev-Blog</div>
        </div>
        <div className={cx('right')}>
          {isEditing &&
            <Button theme="outline" to={`/editor?id=${postId}`}>수정</Button>
          }
          {isEditing &&
            <Button theme="outline" onClick={handleRemove}>삭제</Button>
          }
          <Button theme="outline" to="/editor">새 포스트</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;