import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PostContainer from 'src/containers/PostContainer';

type PostPageProps = {
  id: string,
}

const PostPage: React.FC<RouteComponentProps<PostPageProps>> = ({ match }) => {
  const postId = match.params.id;
  return (
    <PostContainer postId={postId} />
  );
}

export default PostPage;
