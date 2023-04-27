import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/slices/user";
import AddReviewForm from "../../Forms/AddReviewForm/AddReviewForm";
import UserReviewer from "../UserReviewer/UserReviewer";
import style from "./addReview.module.scss";
import { IUser } from "../../../../ts/models/dataModels/IUser";
import { IReview } from "../../../../ts/models/dataModels/IReview";

interface AddReviewProps {
  onSubmit: (data: IReview) => void;
}

const AddReview: React.FC<AddReviewProps> = ({ onSubmit }) => {
  const user: IUser = useSelector(getUser());

  return (
    <div className={style.add_review}>
      <div className={style.add_review__wrapper}>
        <div className={style.add_review__user_reviewer}>
          <UserReviewer {...{ user }} />
        </div>

        <div className={style.add_review__form}>
          <AddReviewForm {...{ onSubmit, user }} />
        </div>
      </div>
    </div>
  );
};

export default AddReview;
