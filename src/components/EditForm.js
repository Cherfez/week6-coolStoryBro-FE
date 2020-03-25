import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { updateMyPage } from "../store/user/actions";
import { selectMyHomepage } from "../store/user/selectors";

export default function EditForm() {
  const homepage = useSelector(selectMyHomepage);
  console.log("???", homepage);
  const [title, setTitle] = useState(homepage.title);
  const [description, setDescription] = useState(homepage.description || "");
  const [backgroundColor, setBackgroundColor] = useState(
    homepage.backgroundColor
  );
  const [color, setColor] = useState(homepage.color);

  const dispatch = useDispatch();

  const submitHandle = event => {
    event.preventDefault();
    console.log(title, description, backgroundColor, color);

    dispatch(updateMyPage(title, description, backgroundColor, color));
  };

  return (
    <Container>
      <Form onSubmit={submitHandle}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={event => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="color"
          value={backgroundColor}
          placeholder="Background"
          onChange={event => {
            setBackgroundColor(event.target.value);
          }}
        />
        <input
          type="color"
          value={color}
          placeholder="Text color"
          onChange={event => {
            setColor(event.target.value);
          }}
        />
        <br />
        <input type="submit" value="Save changes" />
      </Form>
    </Container>
  );
}
