import React from 'react';
import styles from './AskRemoveModal.scss'
import classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Button from 'src/components/common/Button';

const cx = classNames.bind(styles);

type AskRemoveModalProps = {
  visible: boolean,
  onCancel: () => void,
  onConfirm: () => void,
}

const AskRemoveModal: React.FC<AskRemoveModalProps> = ({ visible, onCancel, onConfirm }) => {
  return (
    <ModalWrapper visible={visible}>
      <div className={cx('question')}>
        <div className={cx('title')}>Delete Post</div>
        <div className={cx('description')}>Are you want to delete this post?</div>
      </div>
      <div className={cx('options')}>
        <Button theme="gray" onClick={onCancel}>Cancel</Button>
        <Button theme="confirm" onClick={onConfirm}>Delete</Button>
      </div>
    </ModalWrapper>
  );
}

export default AskRemoveModal;
