import { combineReducers } from "redux";
import { dataReducer } from "./reducers/data/data";
import { authReducer } from "./reducers/auth/auth";

export const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
