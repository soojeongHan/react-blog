import React from 'react';
import styles from './Post.scss';
import classNames from 'classnames/bind';
import { PostResType } from 'src/types';
import MDEditor from '@uiw/react-md-editor';

const cx = classNames.bind(styles);

type postProps = {
  post: PostResType | null,
  date: string,
}

const post: React.FC<postProps> = ({ post, date }) => {
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
            {date}
          </div>
        </div>
      </div>

      <div className={cx('post-body')}>
        <div className={cx('paper')}>
          <MDEditor.Markdown source={post.body} />
        </div>
      </div>
    </div>
  );
}

export default post;
