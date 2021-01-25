import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type PostInfoProps = {

}

const PostInfo: React.FC<PostInfoProps> = () => {
  return (
    <div className={cx('post-info')}>
      <div className={cx('info')}>
        <h1>타이틀</h1>
        <div className={cx('tags')}>
          <a>#태그</a>
          <a>#태그</a>
          <a>#태그</a>
        </div>
        <div className={cx('date')}>
          Jan 19, 2021
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
