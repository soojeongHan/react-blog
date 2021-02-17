import React, { PropsWithChildren } from 'react';
import styles from './List.scss';
import classNames from 'classnames/bind';
import { PostResType } from 'src/types';

const cx = classNames.bind(styles);

type PostItemProps = {
  post: PropsWithChildren<PostResType> | null;
  urlPush: (url: string) => void;
}

const PostItem: React.FC<PostItemProps> = React.memo(({
  post, urlPush,
}) => {
  const url: string = `/post/${post!.postId}`;

  return (
    <div className={cx('post-item')}>
      <h2>
        <div onClick={() => urlPush(url)}>{post!.title}</div>
      </h2>
      <div className={cx('date')}>{post!.publishedDate}</div>
      <p>{post!.body}</p>
      <div className={cx('tags')}>
        {post!.tags.map((v, i) => <a key={i} href={`/tag/${v}`}>#{String(v)}</a>)}
      </div>
    </div>
  );
})

type ListProps = {
  posts: PostResType[] | null;
  lastPage: number | null;
  urlPush: (url: string) => void;
}

const List: React.FC<ListProps> = ({
  posts, lastPage, urlPush,
}) => {
  if (!posts) return <div></div>;

  return (
    <div className={cx('list-wrapper')}>
      <div className={cx('post-list')}>
        {posts.map((post, i) => {
          return <PostItem key={i} post={post} urlPush={urlPush} />
        })}
      </div>
    </div>
  );
}

export default List;
