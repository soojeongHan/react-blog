import React, { PropsWithChildren } from 'react';
import styles from './List.scss';
import classNames from 'classnames/bind';
import { PostResType } from 'src/types';
import icon from 'src/files';

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
      <div className={cx('category')}>
        <img src={icon[post!.category]} alt={post!.category} />
        {/* TODO : tooptip 구현 */}
      </div>
      <h2>
        <div onClick={() => urlPush(url)}>{post!.title}</div>
      </h2>
      <div className={cx('date')}>{post!.publishedDate}</div>
      <p className={cx('body')}>{post!.body}</p>
      <div className={cx('tags')}>
        {post!.tags.map((v, i) => <a key={i} href={`/tag/${v}`}>#{String(v)}</a>)}
      </div>
    </div>
  );
})

type ListProps = {
  posts: PostResType[] | null;
  urlPush: (url: string) => void;
  notFoundList: string;
}

const List: React.FC<ListProps> = ({
  posts, urlPush, notFoundList
}) => {
  if (!posts) return <div></div>;

  return (
    <div className={cx('list-wrapper')}>
      <div className={cx('post-list')}>
        {posts.length ? posts.map((post, i) => {
          return <PostItem key={i} post={post} urlPush={urlPush} />
        }) : <div className={cx('not-found-list')}>{notFoundList}</div>}
      </div>
    </div>
  );
}

export default List;
