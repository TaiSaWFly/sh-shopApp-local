import React, { useState, useEffect } from "react";
import style from "./reviewsPage.module.scss";
import ReviewsList from "../../ui/Reviews/ReviewsList/ReviewsList";
import _ from "lodash";
import AddReview from "../../ui/Reviews/AddReview/AddReview";
import Button from "../../common/ButtonComponent/Button";
import Loading from "../../common/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import {
  createReview,
  deleteReviewError,
  getReview,
  getReviewError,
  getReviewLoadingStatus,
  loadReviewByProductId,
} from "../../../store/slices/review";
import { getIsLoggedInStatus } from "../../../store/slices/user";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/ReduxHooks/reduxHooks";
import { IReview } from "../../../ts/models/dataModels/IReview";

interface ReviewsPageProps {
  productId: string;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ productId }) => {
  const dispatch = useAppDispatch();

  const isLoggedIn: boolean = useSelector(getIsLoggedInStatus());
  const isLoadingReview: boolean = useSelector(getReviewLoadingStatus());
  const reviews: IReview[] = useSelector(getReview());
  const reviewError: string | null = useSelector(getReviewError());

  const [isAdd, setAdd] = useState(false);

  useEffect(() => {
    dispatch(deleteReviewError());
    dispatch(loadReviewByProductId(productId));
    // eslint-disable-next-line
  }, [productId]);

  useEffect(() => {
    setAdd(reviewError ? true : false);
  }, [reviewError]);

  const toggleAddReview = (): void => {
    setAdd((prevState) => !prevState);
    dispatch(deleteReviewError());
  };

  const handleSubmit = (data: IReview): void => {
    dispatch(createReview({ data, productId }));
    setAdd(false);
  };

  const sortReviews = _.orderBy(reviews, ["created_at"], ["desc"]);

  return (
    <>
      {!isLoadingReview ? (
        <>
          {isLoggedIn ? (
            <>
              <div className={style.reviews_page__add_review}>
                <Button onAction={toggleAddReview}>
                  {!isAdd ? "create review" : "delete review"}
                </Button>
              </div>
              {reviewError && (
                <span className={style.reviews_page__error}>{reviewError}</span>
              )}
              {isAdd && <AddReview onSubmit={handleSubmit} />}
            </>
          ) : (
            <>
              {sortReviews.length !== 0 && (
                <div className={style.reviews_page__not_add}>
                  If you want to add review? You must{" "}
                  <Link
                    className={style.reviews_page__not_add__link}
                    to="/auth/signup"
                  >
                    Rerister Account
                  </Link>{" "}
                  !
                </div>
              )}
            </>
          )}

          <ReviewsList reviews={sortReviews} {...{ isAdd, isLoggedIn }} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ReviewsPage;
