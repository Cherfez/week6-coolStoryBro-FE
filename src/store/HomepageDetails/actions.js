import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export function fetchHomepageById(homepageId) {
  return async function(dispatch, getState) {
    const response = await axios.get(`${apiUrl}/${homepageId}`);
    //console.log("response", response.data.homepage);

    dispatch({
      type: "FETCHED_HOMEPAGE_DETAILS_SUCCESS",
      payload: response.data.homepage
    });
  };
}

export function newStory(name, content, imageUrl) {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      const response = await axios.post(
        `${apiUrl}/stories`,
        {
          name,
          content,
          imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(showMessageWithTimeout("success", false, "story posted!", 1500));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
  };
}
