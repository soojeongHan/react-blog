import React from 'react';
import PageTemplate from 'src/components/common/PageTemplate';
import PostBody from 'src/components/post/PostBody';
import PostInfo from 'src/components/post/PostInfo';

type PostPageProps = {

}

const PostPage: React.FC<PostPageProps> = () => {
  return (
    <PageTemplate>
      <PostInfo />
      <PostBody />
    </PageTemplate>
  );
}

export default PostPage;
