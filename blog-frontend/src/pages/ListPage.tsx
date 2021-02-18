import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ListContainer from 'src/containers/ListContainer';

type ListPageProps = {
  page: string | undefined,
  tag: string | undefined,
}

const ListPage: React.FC<RouteComponentProps<ListPageProps>> = ({ match }) => {
  const { page = 1, tag } = match.params;
  const pageNum = Number(page);
  return (
    <ListContainer page={pageNum < 1 ? 1 : pageNum} tag={tag} />
  );
}

export default ListPage;
