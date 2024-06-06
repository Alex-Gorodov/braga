import dayjs from "dayjs";
import { Review } from "../../../types/review";
import { REVIEW_STARS } from "../../../const";
import { ReactComponent as RatingStar } from '../../../img/icons/rating-star.svg';

type ReviewProps = {
  item: Review;
}

export const formatDate = (date: string, format: string) =>
  dayjs(date).format(format);

export const getRating = (rating: number) =>
  (Math.round(rating) * 100) / 5;

export function ReviewItem({item}: ReviewProps): JSX.Element {
  const user = item.user || {};
  const avatar = user.avatar || '/path/to/default/avatar.png';
  const name = user.name || 'Anonymous';

  return (
    <div className="review-item">
      <p className="review-item__author">
        <img className="review-item__author-avatar" src={avatar} alt={name} width={60} height={60}/>
        {name}
      </p>
      <div className="review-item__comment">
        <div className="review-item__rating rating">
          {
            REVIEW_STARS.slice(0, item.rating).map((s, index) => {
              return (
                <span key={index} style={{color: '#efc91c'}}>
                  <RatingStar/>
                </span>
              )
            })
          }
          <div className="review-item__stars rating__stars">
            <span style={{ width: `${getRating(item.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p>{item.review}</p>
        <time
          className="review-item__date"
          dateTime={formatDate(item.date, 'YYYY-MM-DD')}
        >
            {formatDate(item.date, 'DD MMMM YYYY, HH:MM')}
        </time>
      </div>
    </div>
  )
}
