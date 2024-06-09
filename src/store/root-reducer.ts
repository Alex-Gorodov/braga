import { combineReducers } from "redux";
import { dataReducer } from "./reducers/data/data";
import { authReducer } from "./reducers/auth/auth";
import { pageReducer } from "./reducers/page/page";
import { reviewReducer } from "./reducers/review/review";
import userReducer from './slices/user-slice'

export const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
  page: pageReducer,
  review: reviewReducer,
  user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>;
