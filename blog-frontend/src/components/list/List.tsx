import React, { PropsWithChildren } from 'react';
import styles from './List.scss';
import classNames from 'classnames/bind';
import { PostResType } from 'src/types';
import icon from 'src/files';
import { Link } from 'react-router-dom';
import FakeList from './FakeList';

const cx = classNames.bind(styles);

type PostItemProps = {
  post: PropsWithChildren<PostResType> | null;
}

const PostItem: React.FC<PostItemProps> = React.memo(({
  post
}) => {
  const url: string = `/post/${post!.postId}`;

  return (
    <div className={cx('post-item')}>
      <div className={cx('category')}>
        <img src={icon[post!.category]} alt={post!.category} />
      </div>
      <div className={cx('title')}>
        <Link className={cx('title-link')} to={url}>{post!.title}</Link>
      </div>
      <div className={cx('date')}>{post!.publishedDate}</div>
      <p className={cx('body')}>{post!.body}</p>
      <div className={cx('tags')}>
        {post!.tags.map((v, i) => <Link key={i} to={`/tag/${v}`}>#{String(v)}</Link>)}
      </div>
    </div>
  );
})

type ListProps = {
  posts: PostResType[] | null,
  notFoundList: string | null,
  loading: boolean,
}

const List: React.FC<ListProps> = ({
  posts, loading, notFoundList
}) => {
  if (loading)
    return <FakeList postsLength={posts?.length || 10} />

  return (
    <div className={cx('list-wrapper')}>
      <div className={cx('post-list')}>
        {!loading && notFoundList
          ? <div className={cx('not-found-list')}>{notFoundList}</div>
          : posts?.map((post, i) => {
            return <PostItem key={i} post={post} />
          })}
      </div>
    </div>
  );
}

export default List;
