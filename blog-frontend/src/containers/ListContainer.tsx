import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from 'src/components/common/PageTemplate';
import List from 'src/components/list';
import { BlogStateType, getList as getListSaga } from 'src/redux/modules/blog'
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
  search?: string,
  category?: string,
}

const ListContainer: React.FC<ListContainerProps> = ({ page, tag, search, category }) => {
  const dispatch = useDispatch();
  const blog = useSelector<RootState, BlogStateType>(state => state.blog);
  const { posts, lastpage: lastPage, loading }: {
    posts: PostResType[] | null, lastpage: number | null, loading: boolean
  } = blog;

  React.useLayoutEffect(() => {
    dispatch(getListSaga(page, tag, search, category));
    document.documentElement.scrollTop = 0;
  }, [dispatch, page, tag, search, category]);

  const urlPush = (url: string) => {
    dispatch(push(url));
  }
  const createPagePath = (page: number) => {
    return `/page/${page}`;
  }

  TimeAgo.addLocale(ko);
  const EditedPost = posts
    ? posts.map(tmpPost => {
      const post: PostResType = {
        ...tmpPost,
        body: removeMarkdown(tmpPost.body),
        publishedDate: new TimeAgo('ko-KR').format(new Date(tmpPost.publishedDate).getTime()),
      }
      return post;
    })
    : [];

  const notFoundListText = !search ? "현재 포스트가 존재하지 않습니다." : "일치하는 포스트를 찾을 수 없습니다.";

  if (loading) return <div></div>;
  return (
    <PageTemplate>
      <List
        posts={EditedPost}
        urlPush={urlPush}
        notFoundList={notFoundListText} />
      <Pagenation
        lastPage={lastPage ? lastPage : 1}
        createPagePath={createPagePath}
        page={page} />
    </PageTemplate>
  );
}

export default ListContainer;