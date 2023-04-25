import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";

interface BackButtonProps {
  className?: string;
  urlBack: string;
  children: ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({
  className,
  children,
  urlBack,
}) => {
  const history = useHistory();

  const handleRedirect = (): void => {
    history.push(urlBack);
  };

  return (
    <Button className={className} onAction={handleRedirect}>
      {children}
    </Button>
  );
};

export default BackButton;
