import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import { createStore } from "redux";

const rootReducer = combineReducers({
  login: loginReducer,
});

const store = createStore(rootReducer);
export default store;
