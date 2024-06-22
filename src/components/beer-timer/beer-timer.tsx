import { useState, useEffect } from "react";
import { Beer } from "../../types/beer";

type BeerTimerProps = {
  item: Beer;
};

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export function BeerTimer({ item }: BeerTimerProps): JSX.Element {
  const brewDate = new Date(item.brewingDate ? item.brewingDate : new Date());
  const finalDate = new Date(brewDate.getTime() + (item.brewingTimeDays || 0) * 24 * 60 * 60 * 1000);

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = finalDate.getTime() - now.getTime();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number | undefined): string => {
    return time !== undefined && time < 10 ? `0${time}` : `${time}`;
  };

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval as keyof TimeLeft] !== undefined) {
      timerComponents.push(
        <span key={interval} className={`beer-timer__interval`}>
          {formatTime(timeLeft[interval as keyof TimeLeft])}{interval.charAt(0)}
        </span>
      );
    }
  });

  return (
    <div className="product__timer beer-timer">
      {timerComponents.length ? timerComponents : <span>Beer is ready!</span>}
    </div>
  );
}
