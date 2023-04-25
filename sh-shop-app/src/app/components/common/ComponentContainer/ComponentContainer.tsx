import React, { ReactNode } from "react";
import style from "./componentContainer.module.scss";
import { ContainerNameVariant } from "../../../ts/enums/ContainerNameVariant";

interface ComponentContainerProps {
  children: ReactNode;
  containerName?: ContainerNameVariant;
}

const ComponentContainer: React.FC<ComponentContainerProps> = ({
  children,
  containerName,
}) => {
  const getComponentContainerClass = (): string => {
    if (containerName === ContainerNameVariant.NAV_BAR) {
      return style.component_style_nav_bar;
    }

    if (containerName === ContainerNameVariant.FOOTER) {
      return style.component_style_footer;
    }

    return style.component_style;
  };

  return (
    <div className={style.container}>
      <div className={getComponentContainerClass()}>{children}</div>
    </div>
  );
};

export default ComponentContainer;
