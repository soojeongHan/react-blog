import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface ButtonProps {
  children: React.ReactNode,
  to?: any,
  onClick?: () => void,
  disabled?: boolean,
  theme?: string
}

const Div: React.FC = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Button: React.FC<ButtonProps> = ({
  children, to, onClick, disabled, theme = 'default',
}) => {
  const Element = (to && !disabled)
    ? Link
    : Div;
  return (
    <Element
      to={to}
      className={cx('button', theme, { disabled })}
      onClick={disabled
        ? () => null
        : onClick}
    >
      {children}
    </Element>
  );
}

export default Button;
