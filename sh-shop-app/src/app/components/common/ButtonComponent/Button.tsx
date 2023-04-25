import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onAction?: () => void;
  isDisabled?: boolean;
  type?: any;
  // ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onAction,
  isDisabled,
  type,
}) => {
  return (
    <button
      onClick={onAction}
      disabled={isDisabled}
      type={type}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
