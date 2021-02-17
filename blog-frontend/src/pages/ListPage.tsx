import React from 'react';
import ListContainer from 'src/containers/ListContainer';

type ListPageType = {
  match: any;
}

const ListPage: React.FC<ListPageType> = ({ match }) => {
  const { page = 1, tag }: any = match.params;
  return (
    <ListContainer page={page} tag={tag} />
  );
}

export default ListPage;
