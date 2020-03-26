import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { newStory } from "../store/user/actions";

export default function StoryForm() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const submitHandle = event => {
    event.preventDefault();
    //console.log(name, content, imageUrl);

    dispatch(newStory(name, content, imageUrl));
    setName("");
    setContent("");
    setImageUrl("");
  };

  return (
    <Container>
      <Form onSubmit={submitHandle}>
        <label>Story Title</label>
        <input
          type="text"
          value={name}
          placeholder="A Good Title"
          onChange={event => {
            setName(event.target.value);
          }}
        />
        <label>Content</label>
        <input
          type="text"
          value={content}
          placeholder="Tell us a good story, bro"
          onChange={event => {
            setContent(event.target.value);
          }}
        />
        <label>Image</label>
        <input
          type="text"
          value={imageUrl}
          placeholder="show us an image of your story, bro"
          onChange={event => {
            setImageUrl(event.target.value);
          }}
        />
        <label>Preview!</label>
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
