import React from 'react';
import styles from './Post.scss';
import classNames from 'classnames/bind';
import { PostResType } from 'src/types';
import ReactMarkDown from 'react-markdown';

const cx = classNames.bind(styles);

type postProps = {
  post: PostResType | null,
}

const post: React.FC<postProps> = ({ post }) => {
  if (!post) return <div></div>;
  return (
    <div>
      <div className={cx('post-info')}>
        <div className={cx('info')}>
          <h1>{post.title}</h1>
          <div className={cx('tags')}>
            {post.tags.map((tag, i) => <a href={`/tag/${tag}`} key={i}>#{tag}</a>)}
          </div>
          <div className={cx('date')}>
            {post.publishedDate}
          </div>
        </div>
      </div>

      <div className={cx('post-body')}>
        <div className={cx('paper')}>
          <ReactMarkDown source={post.body} />
        </div>
      </div>
    </div>
  );
}

export default post;
