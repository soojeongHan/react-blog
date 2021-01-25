import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type PostListProps = {
}

const PostItem: React.FC = () => {
  return (
    <div className={cx('post-item')}>
      <h2>
        <a>타이틀</a>
      </h2>
      <div className={cx('date')}>2020-01-19</div>
      <p>내용</p>
      <div className={cx('tags')}>
        <a>#태그</a>
        <a>#태그</a>
        <a>#태그</a>
      </div>
    </div>
  );
}
const PostList: React.FC<PostListProps> = () => {
  return (
    <div className={cx('post-list')}>
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  );
}

export default PostList;
