import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectHomepageDetails } from "../../store/HomepageDetails/selectors";
import { fetchHomepageById } from "../../store/HomepageDetails/actions";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function HomepageDetails() {
  const { id } = useParams();
  //console.log(id);
  const dispatch = useDispatch();
  const homepageDetails = useSelector(selectHomepageDetails);
  //console.log("details?", homepageDetails);

  useEffect(() => {
    dispatch(fetchHomepageById(id));
  }, [dispatch, id]);

  return (
    <Container>
      {homepageDetails ? (
        homepageDetails.map(details => {
          return (
            <div key={details.id}>
              <h3>{details.name}</h3>
              <Card.Img variant="top" src={details.imageUrl} alt="something" />
              <p>{details.content}</p>
            </div>
          );
        })
      ) : (
        <h3>Nothing to show yet, Bro</h3>
      )}
    </Container>
  );
}
