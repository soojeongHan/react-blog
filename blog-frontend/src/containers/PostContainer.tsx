import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageTemplate from 'src/components/common/PageTemplate';
import Post from 'src/components/post';
import { getPost as getPostSaga } from 'src/redux/modules/blog';
import { PostResType } from 'src/types';
import { RootState } from 'src/redux/modules/rootReducer';
import AskRemoveModalContainer from './AskRemoveModalContainer';
import Meta from 'src/components/common/Meta/Meta';

// 서버로부터 포스트를 가져오는 함수.
const FetchPostDataFunction = (postId: string) => {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    dispatch(getPostSaga(postId));
  }, [dispatch, postId]);

  const post = useSelector<RootState, PostResType | null>(state => state.blog.post);
  const loading = useSelector<RootState, boolean>(state => state.blog.loading);

  const date: string = (() => {
    const publishedDate: Date = post ? new Date(post.publishedDate) : new Date();
    return `${publishedDate.getFullYear()}. ${publishedDate.getMonth() + 1}. ${publishedDate.getDate()}.`;
  })();

  return {
    post,
    loading,
    date,
  }
}

// 포스트의 제목에 따른 네이게이터 기능을 관리하는 함수.
const NavigatorPostHeadersFunction = () => {
  const postInfoRef = React.useRef<HTMLDivElement>(null);
  const postHeadersRef = React.useRef<HTMLDivElement>(null);
  const postBodyRef = React.useRef<HTMLDivElement>(null);
  const [headers, setHeaders] = React.useState<any>([]);

  const data: Array<any> = Array.from(postBodyRef.current?.children[0]?.children || []);

  React.useEffect(() => {
    let observer: any;
    if (postHeadersRef.current) {
      observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          postHeadersRef.current?.classList.remove('fixed')
        }
        else {
          if (headers.length < 1) {
            const headers: Array<number | string> = ((data) => {
              return data.reduce((pv: Array<object>, cv: HTMLElement, i: number) => {
                if (/^H[0-9]/g.test(cv.tagName)) pv.push({
                  sectionHeading: cv.tagName.split("H").pop(),
                  innerText: cv.innerText,
                  index: i
                });
                return pv;
              }, []);
            })(data);
            setHeaders(headers);
          }
          postHeadersRef.current?.classList.add('fixed');
        }
      });
      observer.observe(postInfoRef.current);
    }
    return () => observer && observer.disconnect();
  }, [data, headers.length])

  const clickHeaderIndex = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const targetElement: any = target.closest('.post-navigator-marker');
    if (targetElement) {
      const index: number = targetElement.dataset.index;
      const widthHeader = 64;
      document.documentElement.scrollTop =
        window.pageYOffset + data[index].getBoundingClientRect().top - widthHeader;
      // scrollIntoView()를 사용해도 되지만, IE와 SAFARI에서는 옵션 값을 사용하지 못한다.
      // data[index].scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  return {
    postInfoRef,
    postHeadersRef,
    postBodyRef,
    clickHeaderIndex,
    headers,
  }
}

type PostContainerProps = {
  postId: string
}

const PostContainer: React.FC<PostContainerProps> = ({ postId }) => {
  const { post, loading, date } = FetchPostDataFunction(postId);
  const { postInfoRef, postHeadersRef, postBodyRef, clickHeaderIndex, headers } = NavigatorPostHeadersFunction();

  const metaData = {
    title: post?.title + ' - Soo Blog',
    description: post?.body?.substring(0, 100),
  }
  if (loading) return <div></div>;
  return (
    <PageTemplate >
      <Meta data={metaData} />
      <Post
        post={post} date={date} dataHeaders={headers} postHeadersRef={postHeadersRef} postBodyRef={postBodyRef} postInfoRef={postInfoRef} loading={loading}
        clickGoHeaderIndex={clickHeaderIndex}
      />
      <AskRemoveModalContainer />
    </PageTemplate>
  );
}

export default PostContainer;
