import React, { useState } from "react";
import Button from "../../../common/ButtonComponent/Button";
import TextAreaField from "../../../common/FieldCommonents/TextAreaField/TextAreaField";
import style from "./addReviewForm.module.scss";
import { IUser } from "../../../../ts/models/dataModels/IUser";
import { FormChangeArgs } from "../../../../ts/types/globalTypes/FormChangeArgs";
import { IReview } from "../../../../ts/models/dataModels/IReview";

interface AddReviewForm {
  user: IUser;
  onSubmit: (data: IReview) => void;
}

const AddReviewForm: React.FC<AddReviewForm> = ({ user, onSubmit }) => {
  const [data, setData] = useState({
    content: "",
  });

  const handleChange = (target: FormChangeArgs<string, string>) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...data, userId: user._id } as IReview);
  };

  return (
    <div className={style.review_form}>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          label="write a review"
          name="content"
          value={data.content}
          onChange={handleChange}
        />

        <Button>add review</Button>
      </form>
    </div>
  );
};

export default AddReviewForm;
