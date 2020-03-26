import axios from "axios";
import { apiUrl } from "../../config/constants";

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
