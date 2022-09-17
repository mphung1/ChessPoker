import React from 'react';
import './Button.scss';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

interface ButtonProps {
  children?: React.ReactNode;
  type?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonStyle?: string;
  buttonSize?: string;
}
export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}: ButtonProps) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
