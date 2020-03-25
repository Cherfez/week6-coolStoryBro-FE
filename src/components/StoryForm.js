import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { newStory } from "../store/HomepageDetails/actions";

export default function StoryForm() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const submitHandle = event => {
    event.preventDefault();
    console.log(name, content, imageUrl);

    dispatch(newStory(name, content, imageUrl));
  };

  return (
    <Container>
      <Form onSubmit={submitHandle}>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={event => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          value={content}
          placeholder="content"
          onChange={event => {
            setContent(event.target.value);
          }}
        />
        <input
          type="text"
          value={imageUrl}
          placeholder="imageUrl"
          onChange={event => {
            setImageUrl(event.target.value);
          }}
        />
        {imageUrl ? (
          <div className="mt-4" md={{ span: 8, offset: 2 }}>
            <img src={imageUrl} alt="preview" thumbnail />
          </div>
        ) : null}
        <br />
        <input type="submit" value="submit" />
      </Form>
    </Container>
  );
}
