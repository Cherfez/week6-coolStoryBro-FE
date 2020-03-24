export function selectHomepageDetails(reduxState) {
  //console.log("reduxState!", reduxState.homepageDetails);
  return reduxState.homepageDetails.stories;
}
