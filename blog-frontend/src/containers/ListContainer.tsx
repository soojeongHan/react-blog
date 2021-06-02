import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';
import removeMarkdown from 'remove-markdown';

import { PostResType } from 'src/types';
import PageTemplate from 'src/components/common/PageTemplate';
import List from 'src/components/list';
import { BlogStateType, getList as getListSaga } from 'src/redux/modules/blog'
import { RootState } from 'src/redux/modules/rootReducer';
import Meta from 'src/components/common/Meta/Meta';
import Scroll from 'src/components/list/Scroll';


const FetchListDataFunction = (
  dispatch: Dispatch<any>,
  query: any,
  posts: PostResType[] | null,
  lastPage: number | null,
) => {
  const [page, setPage] = React.useState(Math.ceil((posts?.length || 10) / 10));
  const latestQuery = React.useRef(query);

  React.useEffect(() => {
    const fetchData = () => {
      if (latestQuery.current !== query) {
        setPage(1);
        dispatch(getListSaga(query, page));
        latestQuery.current = query;
      }
      else dispatch(getListSaga(query, page));
    }
    fetchData();
  }, [dispatch, query, page]);

  const fetchMoreTriggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (fetchMoreTriggerRef?.current) {
      observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting)
          setPage((prevPage) =>
            prevPage < (lastPage || -1)
              ? prevPage + 1
              : prevPage
          );
      });
      observer.observe(fetchMoreTriggerRef.current);
    }
    return () => observer && observer.disconnect();
  }, [fetchMoreTriggerRef, lastPage]);

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

  const notFoundListText = query.search && !EditedPost.length
    ? "일치하는 포스트를 찾을 수 없습니다."
    : null;

  return {
    EditedPost, notFoundListText, fetchMoreTriggerRef,
  }
}

type ListContainerProps = {
  query: any
}

const ListContainer: React.FC<ListContainerProps> = ({ query }) => {
  const dispatch = useDispatch();
  // 서버로부터 데이터를 가져와서 필요한 데이터를 처리한다.
  const { posts, lastpage: lastPage = 1, loading } = useSelector<RootState, BlogStateType>(state => state.blog);
  const { EditedPost, notFoundListText, fetchMoreTriggerRef } = FetchListDataFunction(dispatch, query, posts, lastPage);

  const metaData = {
    title: 'Soo Blog',
    description: 'Web Frontend IT 개발 블로그'
  }
  return (
    <PageTemplate>
      <Meta data={metaData} />
      <List
        posts={EditedPost}
        notFoundList={notFoundListText}
        loading={loading} />
      <Scroll ref={fetchMoreTriggerRef} />
    </PageTemplate>
  );
}

export default ListContainer;