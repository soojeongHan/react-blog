import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from 'src/components/common/PageTemplate';
import List from 'src/components/list';
import { getList as getListSaga } from 'src/redux/modules/blog'
import { RootState } from 'src/redux/modules/rootReducer';
import { PostResType } from 'src/types';
import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';
import removeMarkdown from 'remove-markdown';
import { push } from 'connected-react-router';
import Pagenation from 'src/components/list/Pagenation';

type ListContainerProps = {
  page: number,
  tag?: string,
}

const ListContainer: React.FC<ListContainerProps> = ({ page, tag }) => {
  const dispatch = useDispatch();
  const posts = useSelector<RootState, PostResType[] | null>(state => state.blog.posts);
  const lastPage = useSelector<RootState, number | null>(state => state.blog.lastpage);
  const loading = useSelector<RootState, boolean>(state => state.blog.loading);

  useLayoutEffect(() => {
    dispatch(getListSaga(page, tag));
    document.documentElement.scrollTop = 0;
  }, [dispatch, page, tag]);

  const urlPush = (url: string) => {
    dispatch(push(url));
  }
  const createPagePath = (page: number) => {
    return `/page/${page}`;
  }

  TimeAgo.addLocale(ko);
  const EditedPost = posts
    ? posts.map(post => {
      const tmpPost: PostResType = {
        postId: post.postId,
        title: post.title,
        body: removeMarkdown(post.body),
        publishedDate: new TimeAgo('ko-KR').format(new Date(post.publishedDate).getTime()),
        tags: post.tags
      }
      return tmpPost;
    })
    : posts

  if (loading) return <div></div>;
  return (
    <PageTemplate>
      <List posts={EditedPost} lastPage={lastPage} urlPush={urlPush} />
      <Pagenation lastPage={lastPage ? lastPage : 1} createPagePath={createPagePath} page={page} />
    </PageTemplate>
  );
}

export default ListContainer;