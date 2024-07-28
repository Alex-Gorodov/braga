import { useSelector } from "react-redux";
import { RootState } from "../store/root-reducer";

export function useAuth() {
  const { email, token, id } = useSelector((state: RootState) => state.auth.userInfo ? state.auth.userInfo : {email: 'null', token: 'null', id: 'null'});

  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}
