import { combineReducers } from "redux";
import { pageReducer } from "./reducers/page/page";
import { dataReducer } from "./reducers/data/data";

export const rootReducer = combineReducers({
  page: pageReducer,
  data: dataReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
