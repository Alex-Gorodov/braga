import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { toggleSignUpForm } from "../../store/actions";

export function RegisterForm(): JSX.Element {
  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);
  const dispatch = useDispatch();

  const formRef = useOutsideClick(() => {
    dispatch(toggleSignUpForm({isOpened: !isSignUpOpened}));
  }) as React.RefObject<HTMLFormElement>;

  return (
    isSignUpOpened ?
    <div className="form__wrapper">
      <form action="#" className="form register__form" method="post" ref={formRef}>
        dfs
      </form>
    </div>
    : <></>
  )
}
