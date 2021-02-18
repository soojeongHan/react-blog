import React from 'react';
import PageTemplate from 'src/components/common/PageTemplate';
import Post from 'src/components/post';
import { useDispatch, useSelector } from 'react-redux';
import { getPost as getPostSaga } from 'src/redux/modules/blog';
import { PostResType } from 'src/types';
import { RootState } from '../redux/modules/rootReducer';
import AskRemoveModalContainer from './AskRemoveModalContainer';

type PostContainerProps = {
  postId: string
}

const PostContainer: React.FC<PostContainerProps> = ({ postId }) => {
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    dispatch(getPostSaga(postId, false));
  }, [dispatch, postId]);

  const post = useSelector<RootState, PostResType | null>(state => state.blog.post);
  const loading = useSelector<RootState, boolean>(state => state.blog.loading) || false;
  const publishedDate: Date = post ? new Date(post.publishedDate) : new Date();
  const date: string = `${publishedDate.getFullYear()}. ${publishedDate.getMonth()}. ${publishedDate.getDate()}.`;

  if (loading) return <div></div>;
  return (
    <PageTemplate >
      <Post post={post} date={date} />
      <AskRemoveModalContainer />
    </PageTemplate>
  );
}

export default PostContainer;
