import React from 'react';
import Header from 'src/components/common/Header';
import { useDispatch } from 'react-redux';
import { getList as getListSaga } from 'src/redux/modules/blog';
import { history } from 'src/redux/create';
import { showModal } from 'src/redux/modules/base';

type HeaderContainerProps = {

}

const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const isEditing = history.location.pathname !== "/" && history.location.pathname.includes('post');
  const postId = isEditing ? history.location.pathname.split("post/").pop() : "";
  const dispatch = useDispatch();
  const goHomepage = () => {
    dispatch(getListSaga(1));
  }
  const handleRemove = () => {
    dispatch(showModal('remove'));
  }
  return (
    <Header goHomepage={goHomepage} handleRemove={handleRemove} isEditing={isEditing} postId={postId} />
  );
}

export default HeaderContainer;
