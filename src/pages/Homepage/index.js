import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomepagesThunk } from "../../store/homepages/actions";
import { selectHomepages } from "../../store/homepages/selectors";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function HomePages() {
  const dispatch = useDispatch();
  const homepages = useSelector(selectHomepages);
  console.log("homepage", homepages);

  useEffect(() => {
    dispatch(getHomepagesThunk());
  }, [dispatch]);

  return (
    <div>
      {/* {console.log(homepages)} */}
      {homepages.map(homepage => {
        return (
          <div
            key={homepage.id}
            style={{
              backgroundColor: homepage.backgroundColor,
              color: homepage.color
            }}
          >
            <h2>{homepage.title}</h2>
            <p>{homepage.description}</p>
            <Link to={`/${homepage.id}`}>
              <Button className="mt-2" variant="outline-info bg-white">
                Visit Page
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
