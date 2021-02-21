import React from 'react';
import Header from 'src/components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { history } from 'src/redux/create';
import { showModal } from 'src/redux/modules/base';
import { RootState } from 'src/redux/modules/rootReducer';

type HeaderContainerProps = {

}

const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const dispatch = useDispatch();
  const logged = useSelector<RootState, boolean>(state => state.base.logged);
  const isEditing = history.location.pathname !== "/" && history.location.pathname.includes('post');
  const postId = isEditing ? history.location.pathname.split("post/").pop() : "";

  const goHomepage = () => {
    history.location.pathname === "/"
      ? window.location.reload()
      : history.push('/');
  }
  const handleRemove = () => {
    dispatch(showModal('remove'));
  }

  return (
    <Header
      goHomepage={goHomepage}
      handleRemove={handleRemove}
      isEditing={isEditing}
      postId={postId}
      logged={logged} />
  );
}

export default HeaderContainer;
