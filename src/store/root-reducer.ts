import { combineReducers } from "redux";
import { dataReducer } from "./reducers/data/data";
import { authReducer } from "./reducers/auth/auth";
import { pageReducer } from "./reducers/page/page";
import { reviewReducer } from "./reducers/review/review";

export const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
  page: pageReducer,
  review: reviewReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
