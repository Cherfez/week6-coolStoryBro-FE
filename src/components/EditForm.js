import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { updateMyPage } from "../store/user/actions";
import { selectMyHomepage } from "../store/user/selectors";

export default function EditForm() {
  const homepage = useSelector(selectMyHomepage);
  //console.log("???", homepage);
  const [title, setTitle] = useState(homepage.title);
  const [description, setDescription] = useState(homepage.description || "");
  const [backgroundColor, setBackgroundColor] = useState(
    homepage.backgroundColor
  );
  const [color, setColor] = useState(homepage.color);

  const dispatch = useDispatch();

  const submitHandle = event => {
    event.preventDefault();
    //console.log(title, description, backgroundColor, color);

    dispatch(updateMyPage(title, description, backgroundColor, color));
  };

  return (
    <Container>
      <Form onSubmit={submitHandle}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="What is your title?"
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          placeholder="Something about you"
          onChange={event => {
            setDescription(event.target.value);
          }}
        />
        <label>Background Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={event => {
            setBackgroundColor(event.target.value);
          }}
        />
        <label>Text color</label>
        <input
          type="color"
          value={color}
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
