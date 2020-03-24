const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_HOMEPAGE_DETAILS_SUCCESS":
      const newState = action.payload;
      console.log("newsate", newState);
      return action.payload;

    default:
      return state;
  }
};
