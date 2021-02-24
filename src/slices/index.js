import { combineReducers } from "redux";
import currentUserReducer from './currentUser'
import layoutReducer from "./layout";
import roomReducer from "./room";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  layout: layoutReducer,
  room: roomReducer
})

export default rootReducer;