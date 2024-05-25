import { combineReducers } from "redux";
import { pageReducer } from "./reducers/page/page";

export const rootReducer = combineReducers({
  page: pageReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
