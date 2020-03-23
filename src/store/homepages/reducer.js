const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHED_HOMEPAGES_SUCCESS":
      return [...action.payload]; //dont copy state cuz that will keep doubling what we have on page

    default:
      return state;
  }
}
