import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AskRemoveModal from 'src/components/modal/AskRemoveModal/AskRemoveModal';
import { hideModal } from 'src/redux/modules/base';
import { RootState } from 'src/redux/modules/rootReducer';
import { deletePost as deletePostSaga } from 'src/redux/modules/blog';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type AskRemoveModalContainerProps = {
  id: string,
}

const AskRemoveModalContainer: React.FC<RouteComponentProps<AskRemoveModalContainerProps>> = ({ match }) => {
  const postId = match.params.id;
  const visible = useSelector<RootState, boolean>(state => state.base.modal.remove);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideModal('remove'));
  }
  const handleConfirm = async () => {
    try {
      await dispatch(deletePostSaga(postId));
      dispatch(hideModal('remove'));
    }
    catch (e) {
      console.error(e);
    }
  }
  return (
    <AskRemoveModal
      visible={visible}
      onCancel={handleCancel}
      onConfirm={handleConfirm} />
  );
}

export default withRouter(AskRemoveModalContainer);
