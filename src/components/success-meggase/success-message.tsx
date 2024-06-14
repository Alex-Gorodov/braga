import { useState } from "react";
import { SuccessMessages } from "../../const"
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Spinner } from "../spinner/spinner";

type SuccessMessageProps = {
  message: SuccessMessages;
  fun: (arg: boolean) => void;
}

export function SuccessMessage({message, fun}: SuccessMessageProps): JSX.Element {
  const messageRef = useOutsideClick(() => {
    fun(false);
  }) as React.RefObject<HTMLDivElement>;

  const [isSuccess, setIsSuccess] = useState(false);

  setTimeout(() => {
    setIsSuccess(true)
  }, Math.random() * 3000);

  return (
    <div className="message message--success" ref={messageRef}>
      <div>
        {
          !isSuccess ? <Spinner size="40" wrapper/> : message
        }
      </div>
      {
        isSuccess &&
        <button className="button" onClick={() => fun(false)}>
          Ok!
        </button>
      }
    </div>
  )
}
