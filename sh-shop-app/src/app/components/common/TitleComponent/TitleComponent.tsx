import React from "react";
import style from "./titleComponent.module.scss";

interface TitleComponentProps {
  title: string;
  subtitle?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ title, subtitle }) => {
  return (
    <div className={style.title_component}>
      <div className={style.title}>{title}</div>
      {subtitle && <div className={style.subtitle}>{subtitle}</div>}
    </div>
  );
};

export default TitleComponent;
