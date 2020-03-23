import { apiUrl } from "../../config/constants";
import axios from "axios";

export function getHomepagesThunk() {
  return async (dispatch, getState) => {
    //console.log("hi");
    const response = await axios.get(`${apiUrl}`);

    //console.log("resp>", response.data);
    dispatch({ type: "FETCHED_HOMEPAGES_SUCCESS", payload: response.data });
  };
}
