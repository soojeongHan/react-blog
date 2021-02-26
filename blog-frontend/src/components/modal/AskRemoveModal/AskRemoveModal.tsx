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
        <div className={cx('title')}>포스트 삭제</div>
        <div className={cx('description')}>이 포스트를 삭제하시겠습니까?</div>
      </div>
      <div className={cx('options')}>
        <Button theme="gray" onClick={onCancel}>취소</Button>
        <Button onClick={onConfirm}>삭제</Button>
      </div>
    </ModalWrapper>
  );
}

export default AskRemoveModal;
