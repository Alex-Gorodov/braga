import { Fragment } from "react/jsx-runtime";
import { REVIEW_STARS } from "../../../const";
import { useSelector } from "react-redux";
import { getReviewLoadingStatus } from "../../../store/actions";
import { useState } from "react";
import { ReactComponent as RatingStar } from '../../../img/icons/rating-star.svg';

export function ReviewForm(): JSX.Element {
  const reviewStatus = useSelector(getReviewLoadingStatus);
  const [reviewFormData, setFormData] = useState({ rating: '', review: '', id: '' });

  const handleRatingSelect = (star: string) => {
    if (star !== reviewFormData.rating) {
      setFormData({...reviewFormData, rating: star});
    }
    console.log(star);

  };

  return (
    <div className="review-form">
      <form action="#" method="post">
        <legend>Your email address will not be published. Required fields are marked *</legend>
        <div className="review__rating-form form__rating">
        {
          REVIEW_STARS.map((star) => (
            <Fragment key={star.value}>
              <input
                className="review-form__rating-input visually-hidden"
                name="rating"
                value={star.value}
                id={`${star.value}-stars`}
                type="radio"
                disabled={reviewStatus}
              />
              <label
                htmlFor={`${star.value}-stars`}
                className="review-form__star"
                onClick={() => {handleRatingSelect(String(star.value));}}
                title={star.title}
              >
                <RatingStar/>
              </label>
            </Fragment>
          ))
        }
      </div>
      </form>
    </div>
  )
}
