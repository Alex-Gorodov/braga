import dayjs from "dayjs";
import { Review } from "../../../types/review";

type ReviewProps = {
  item: Review;
}

export const formatDate = (date: string, format: string) =>
  dayjs(date).format(format);

export const getRating = (rating: number) =>
  (Math.round(rating) * 100) / 5;

export function ReviewItem({item}: ReviewProps): JSX.Element {

  return (
    <div className="review-item">
      <p className="review-item__author">
        <img className="review-item__author-avatar" src={item.user.avatar} alt={item.user.avatar} width={60} height={60}/>
        {item.user.name}
      </p>
      <p className="review-item__comment">
        <div className="review-item__rating rating">
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
      </p>
    </div>
  )
}
