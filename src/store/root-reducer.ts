import { combineReducers } from "redux";
import { dataReducer } from "./reducers/data/data";
import { authReducer } from "./reducers/auth/auth";
import { pageReducer } from "./reducers/page/page";

export const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
  page: pageReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
