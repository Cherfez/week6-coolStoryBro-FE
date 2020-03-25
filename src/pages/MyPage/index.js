import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import StoryForm from "../../components/StoryForm";
import { selectToken } from "../../store/user/selectors";
import { useSelector } from "react-redux";

//useSelect to grab the token. If token is the same as login token, fetch all the info of user
//
//

export default function MyPage() {
  const [show, setShow] = useState(false);

  const token = useSelector(selectToken);
  console.log("token", token);

  function showStoryForm() {
    return (
      <div>
        <StoryForm />
      </div>
    );
  }

  function clickHandle() {
    setShow(!show);
  }

  return (
    <div>
      <Button onClick={clickHandle}>Post a cool story, Bro</Button>

      {show && showStoryForm()}
    </div>
  );
}
