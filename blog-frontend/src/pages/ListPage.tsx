import React from 'react';
import PageTemplate from 'src/components/common/PageTemplate';
import ListWrapper from 'src/components/list/ListWrapper';
import Pagenation from 'src/components/list/Pagenation';
import PostList from 'src/components/list/PostList';


const ListPage: React.FC = () => {
  return (
    <PageTemplate>
      <ListWrapper>
        <PostList />
        <Pagenation />
      </ListWrapper>
    </PageTemplate>
  );
}

export default ListPage;
