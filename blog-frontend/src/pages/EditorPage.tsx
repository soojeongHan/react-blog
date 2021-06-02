import React from 'react';
import EditorContainer from 'src/containers/EditorContainer';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'query-string';

type LocationParams = {
  search: string | undefined,
}

const EditorPage: React.FC<RouteComponentProps<LocationParams>> = ({ location }) => {
  const id = qs.parse(location.search)?.id;
  const postId: string | undefined = typeof id === 'object' ? undefined : id;
  return (
    <EditorContainer postId={postId} />
  );
}

export default EditorPage;