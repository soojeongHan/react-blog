import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ListContainer from 'src/containers/ListContainer';

const ListPage: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <ListContainer query={match.params} />
  );
}

export default ListPage;
