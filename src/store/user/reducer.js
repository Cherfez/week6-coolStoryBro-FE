import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  UPDATE_SUCCESS,
  NEWSTORY_SUCCESS
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  homepage: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case UPDATE_SUCCESS:
      return {
        ...state,
        homepage: { ...action.payload, stories: state.homepage.stories }
      };

    case NEWSTORY_SUCCESS:
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: [...state.homepage.stories, action.payload]
        }
      };

    default:
      return state;
  }
};
