import { Fragment, useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { REVIEW_STARS } from "../../../const";
import { ReactComponent as RatingStar } from '../../../img/icons/rating-star.svg';
import { Review } from "../../../types/review";
import { AppDispatch } from "../../../types/state";
import { addReview, getReviewLoadingStatus } from "../../../store/actions";
import { RootState } from "../../../store/root-reducer";
import { Beer } from "../../../types/beer";

type ReviewFormProps = {
  item: Beer;
}

export function ReviewForm({item}: ReviewFormProps): JSX.Element {
  const users = useSelector((state: RootState) => state.data.users)
  const dispatch: AppDispatch = useDispatch();
  const reviewStatus = useSelector(getReviewLoadingStatus);
  const [reviewFormData, setFormData] = useState<Review>({date: (new Date()).toISOString(), user: users[0], rating: 0, review: '', id: 0 });
  const formRef = useRef<HTMLFormElement>(null);
  const refButton = useRef<HTMLButtonElement | null>(null);
  const params = useParams<{ id: string }>();
  const paramsId = Number(params.id);

  useEffect(() => {
    if (reviewFormData.id !== paramsId) {
      setFormData({ ...reviewFormData, id: paramsId });
    }
  }, [paramsId, reviewFormData]);

  const handleRatingSelect = (star: string) => {
    setFormData({ ...reviewFormData, rating: Number(star) });
  };

  const date = (new Date()).toISOString();

  const handleChangeData = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...reviewFormData, [evt.target.name]: evt.target.value });
  };

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(addReview({
      review: { ...reviewFormData, date: date, user: users[0] },
      item: item
    }))

  };

  return (
    <div className="review-form">
      <form action="#" method="post" ref={formRef} onSubmit={handleFormSubmit}>
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
                  onChange={() => handleRatingSelect(String(star.value))}
                  checked={reviewFormData.rating === star.value}
                />
                <label
                  htmlFor={`${star.value}-stars`}
                  className="review-form__star"
                  title={star.title}
                >
                  <RatingStar />
                </label>
              </Fragment>
            ))
          }
        </div>
        <textarea
          onChange={handleChangeData}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={reviewFormData.review}
          disabled={reviewStatus}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={reviewStatus || reviewFormData.review.length < 50 || reviewFormData.rating === 0}
            ref={refButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
