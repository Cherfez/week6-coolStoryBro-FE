import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import homepage from "./homepages/reducer";

export default combineReducers({
  appState,
  user,
  homepage
});
