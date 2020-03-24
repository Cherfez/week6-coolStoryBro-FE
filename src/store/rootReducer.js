import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import homepage from "./homepages/reducer";
import homepageDetails from "./HomepageDetails/reducer";

export default combineReducers({
  appState,
  user,
  homepage,
  homepageDetails
});
