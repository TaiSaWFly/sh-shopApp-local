import React from "react";
import { Link } from "react-router-dom";
import style from "./collectionHeader.module.scss";

interface CollectionHeaderProps {
  name: string;
  path?: string;
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ name, path }) => {
  return (
    <div className={style.collection_header}>
      <div className={style.collection_header_wrapper}>
        <div className={style.collection_header_title__uppercase}>{name}</div>
        <>
          {path && (
            <Link
              to={{
                pathname: `/collection/${path}/products`,
              }}
            >
              show all
            </Link>
          )}
        </>
      </div>
    </div>
  );
};

export default CollectionHeader;
