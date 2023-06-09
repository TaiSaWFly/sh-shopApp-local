import React, { ReactNode } from "react";
import style from "./renderCollectionLinks.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCollectionCategory } from "../../../../store/slices/collectionCategory";
import { ICollectionCaterory } from "../../../../ts/models/dataModels/ICollectionCaterory";

const RenderCollectionLinks: React.FC = () => {
  const collections: ICollectionCaterory[] = useSelector(
    getCollectionCategory()
  );

  const renderCollectionLink = (
    collectionPath: string,
    name: string
  ): ReactNode => {
    return (
      <Link
        to={{
          pathname: `/collection/${collectionPath}`,
        }}
      >
        {name}
      </Link>
    );
  };
  return (
    <div className={style.content}>
      Try to find something in this Collections{" "}
      {
        <>
          {collections.map((c, i, arr) =>
            i === arr.length - 1 ? (
              <span key={c._id}>
                {" and"} {renderCollectionLink(c.path, c.name)}
              </span>
            ) : i === arr.length - 2 ? (
              <span key={c._id}>{renderCollectionLink(c.path, c.name)}</span>
            ) : (
              <span key={c._id}>
                {renderCollectionLink(c.path, c.name)}
                {", "}
              </span>
            )
          )}
        </>
      }
    </div>
  );
};

export default RenderCollectionLinks;
