import { Fragment, useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import { ReactComponent as RatingStar } from '../../../img/icons/rating-star.svg';
import { addReview } from "../../../store/actions";
import { addReviewToDatabase } from "../../../store/api-actions";
import { RootState } from "../../../store/root-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../types/state";
import { Review } from "../../../types/review";
import { REVIEW_STARS } from "../../../const";
import { useParams } from "react-router-dom";
import { Beer } from "../../../types/beer";

type ReviewFormProps = {
  item: Beer;
}

export function ReviewForm({item}: ReviewFormProps): JSX.Element {
  const users = useSelector((state: RootState) => state.data.users);
  const authedUser = useSelector((state: RootState) => state.user)

  const activeUser = users.find((user) => user.id === authedUser.id)

  const dispatch: AppDispatch = useDispatch();
  const [reviewFormData, setFormData] = useState<Review>({
    date: (new Date()).toISOString(),
    user: activeUser ? activeUser : {
      id: users.length.toString(),
      name: 'Guest',
      surname: '',
      email: '',
      phone: '',
      password: '',
      isAdmin: false,
      cartItems: [],
      notifications: [],
      liked: [],
      avatar: '',
      token: '',
      preOrder: []
    },
    rating: 0,
    review: '',
    id: 0
  });

  const formRef = useRef<HTMLFormElement>(null);
  const refButton = useRef<HTMLButtonElement | null>(null);
  const params = useParams<{ id: string }>();
  const paramsId = Number(params.id);

  useEffect(() => {
    if (activeUser) {
      setFormData(prevData => ({
        ...prevData,
        user: activeUser
      }));
    }
  }, [activeUser]);

  useEffect(() => {
    if (reviewFormData.id !== paramsId) {
      setFormData({ ...reviewFormData, id: paramsId });
    }
  }, [paramsId, reviewFormData]);

  const handleRatingSelect = (star: number) => {
    setFormData({ ...reviewFormData, rating: star });
  };

  const date = (new Date()).toISOString();

  const handleChangeData = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...reviewFormData, [evt.target.name]: evt.target.value });
  };

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (activeUser) {
      const updatedReview = {
        ...reviewFormData,
        date: date,
        user: activeUser
      };
      dispatch(addReview({ review: updatedReview, item: item }));
      addReviewToDatabase(item, updatedReview);
      setFormData({ ...updatedReview, rating: 0, review: '' });
    }
  };

  return (
    <div className="review-form__wrapper">
      <form className="review-form" action="#" method="post" ref={formRef} onSubmit={handleFormSubmit}>
        <legend>Please indicate your rating and fill out the review form</legend>
        <div className="review__rating-form review-form__rating">
          {REVIEW_STARS.map((star) => (
            <Fragment key={star.value}>
              <input
                className="review-form__rating-input visually-hidden"
                name="rating"
                value={star.value}
                id={`${star.value}-stars`}
                type="radio"
                onChange={() => handleRatingSelect(star.value)}
                checked={reviewFormData.rating === star.value}
              />
              <label
                htmlFor={`${star.value}-stars`}
                className="review-form__label"
                title={star.title}
              >
                <RatingStar className="review-form__star-image" />
              </label>
            </Fragment>
          ))}
        </div>
        <textarea
          onChange={handleChangeData}
          className="review-form__textarea"
          id="review"
          name="review"
          rows={5}
          placeholder="Your review here..."
          value={reviewFormData.review}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set rating and describe your stay
            with at least <b className="review-form__text-amount">15 characters</b>.
          </p>
          <button
            className="reviews__submit review-form__submit button"
            type="submit"
            disabled={ reviewFormData.review.length < 15 || reviewFormData.rating === 0 }
            ref={refButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
