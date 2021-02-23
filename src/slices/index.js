import { combineReducers } from "redux";
import currentUserReducer from './currentUser'
import layoutReducer from "./layout";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  layout: layoutReducer
})

export default rootReducer;