import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const NEWSTORY_SUCCESS = "NEWSTORY_SUCCESS";
export const DELETESTORY_SUCCESS = "DELETESTORY_SUCCESS";

const loginSuccess = userWithToken => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken
  };
};

const tokenStillValid = userWithoutToken => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken
});

const updateSuccess = userUpdate => {
  return {
    type: UPDATE_SUCCESS,
    payload: userUpdate
  };
};

const newStorySuccess = story => {
  return {
    type: NEWSTORY_SUCCESS,
    payload: story
  };
};

const deleteStorySuccess = storyId => {
  return {
    type: DELETESTORY_SUCCESS,
    payload: storyId
  };
};

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const updateMyPage = (title, description, backgroundColor, color) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    // const { homepage, token } = selectUser(getState());
    dispatch(appLoading());

    const response = await axios.patch(
      `${apiUrl}/other`,
      {
        title,
        description,
        backgroundColor,
        color
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    dispatch(
      showMessageWithTimeout("success", false, "update successfull", 3000)
    );
    dispatch(updateSuccess(response.data.homepage));
    dispatch(appDoneLoading());
  };
};

export const newStory = (name, content, imageUrl) => {
  return async (dispatch, getState) => {
    // const { homepage, token } = selectUser(getState());
    const { token } = selectUser(getState());
    //console.log(name, content, imageUrl);
    dispatch(appLoading());

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
    dispatch(
      showMessageWithTimeout("success", false, response.data.message, 3000)
    );
    dispatch(newStorySuccess(response.data.story));
    dispatch(appDoneLoading());
  };
};

export const deleteStory = storyId => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    dispatch(appLoading());

    try {
      const response = await axios.delete(`${apiUrl}/other/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(deleteStorySuccess(storyId)); //same as response.data
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e);
    }
  };
};
