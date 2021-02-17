import React from 'react';
import EditorContainer from 'src/containers/EditorContainer';

type EditorPageType = {
  location: any,
  match: any,
}

const EditorPage: React.FC<EditorPageType> = ({ location, match }) => {
  const postId = location.search.split("id=").pop();
  const isNewPost = postId === "";
  return (
    <EditorContainer postId={postId} isNewPost={isNewPost} />
  );
}

export default EditorPage;
