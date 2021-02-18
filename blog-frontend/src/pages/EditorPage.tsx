import React from 'react';
import EditorContainer from 'src/containers/EditorContainer';
import { RouteComponentProps } from 'react-router-dom';

type LocationParams = {
  search: string | undefined,
}

const EditorPage: React.FC<RouteComponentProps<LocationParams>> = ({ location }) => {
  const postId = location.search.split("id=").pop();
  const isNewPost = postId === "";
  return (
    <EditorContainer postId={postId} isNewPost={isNewPost} />
  );
}

export default EditorPage;
