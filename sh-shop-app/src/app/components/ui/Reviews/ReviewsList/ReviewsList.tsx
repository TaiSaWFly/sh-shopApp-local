import React from "react";
import style from "./reviewsList.module.scss";
import Review from "../Review/Review";
import { Link } from "react-router-dom";
import { deleteReview } from "../../../../store/slices/review";
import { useAppDispatch } from "../../../../hooks/ReduxHooks/reduxHooks";
import { IReview } from "../../../../ts/models/dataModels/IReview";

interface ReviewsListProps {
  reviews: IReview[];
  isAdd: boolean;
  isLoggedIn: boolean;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
  reviews,
  isAdd,
  isLoggedIn,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteReview = (reviewId: string): void => {
    dispatch(deleteReview(reviewId));
  };

  return (
    <>
      {reviews.length !== 0 ? (
        reviews.map((review) => (
          <Review
            key={review._id}
            {...{ review, isLoggedIn, handleDeleteReview }}
          />
        ))
      ) : (
        <>
          {!isAdd && (
            <div className={style.empty_reviews_list}>
              <p>There is no review for this product right now...</p>
              {isLoggedIn ? (
                <span>Do you want to add first review?</span>
              ) : (
                <span>
                  If you want to add review? You must{" "}
                  <Link
                    className={style.empty_reviews_list__link}
                    to="/auth/signup"
                  >
                    Rerister Account
                  </Link>{" "}
                  !
                </span>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ReviewsList;
