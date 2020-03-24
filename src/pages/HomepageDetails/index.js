import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectHomepageDetails } from "../../store/HomepageDetails/selectors";
import { fetchHomepageById } from "../../store/HomepageDetails/actions";

export default function HomepageDetails() {
  const { id } = useParams();
  console.log(useParams());
  //console.log(id);
  const dispatch = useDispatch();
  console.log(dispatch);
  const homepageDetails = useSelector(selectHomepageDetails);
  console.log("details?", homepageDetails);

  useEffect(() => {
    dispatch(fetchHomepageById(id));
  }, [dispatch, id]);

  return (
    <div>
      {homepageDetails
        ? homepageDetails.map(details => {
            return (
              <div key={details.id}>
                <h3>{details.name}</h3>
                <img src={details.imageUrl} alt="something" />
                <p>{details.content}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}
