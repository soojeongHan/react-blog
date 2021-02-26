import React from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';
import { setTimeout } from 'timers';

const cx = classNames.bind(styles);

type ModalWrapperProps = {
  children: React.ReactNode,
  visible: boolean
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, visible }) => {
  const [animate, setAnimate] = React.useState<boolean>(false);

  const startAnimation = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 250);
  }

  React.useLayoutEffect(() => {
    if (visible) startAnimation();
    return () => {
      //TODO : cleanup Function
      setAnimate(false);
    }
  }, [visible]);

  if (!visible && !animate) return <></>;

  const animation = animate && (visible ? 'enter' : 'leave');

  return (
    <div className={cx('gray-background', animation)}>
      <div className={cx('modal-wrapper')}>
        <div className={cx('modal', animation)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalWrapper;
