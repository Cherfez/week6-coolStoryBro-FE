import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import StoryForm from "../../components/StoryForm";
import { useSelector, useDispatch } from "react-redux";
import EditForm from "../../components/EditForm";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import Container from "react-bootstrap/Container";
import { deleteStory } from "../../store/user/actions";

export default function MyPage() {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();

  const { homepage } = useSelector(selectUser);
  //console.log("homepage?", homepage);

  function showStoryForm() {
    return (
      <div>
        <StoryForm />
      </div>
    );
  }
  function clickHandleForm() {
    setShowForm(!showForm);
  }

  function showEditForm() {
    return (
      <div>
        <EditForm />
      </div>
    );
  }
  function clickHandleEdit() {
    setShowEdit(!showEdit);
  }

  if (!homepage) {
    return <Loading />;
  }

  function onDelete(id) {
    console.log("deleting", id);
    dispatch(deleteStory(id));
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: homepage.backgroundColor,
          color: homepage.color
        }}
      >
        <h3>{homepage.title}</h3>
        <p>{homepage.description}</p>
      </div>

      <div>
        <Button onClick={clickHandleForm}>Post a cool story, Bro</Button>
        {showForm && showStoryForm()}
      </div>
      <div>
        <Button onClick={clickHandleEdit}>Edit your page, Bro</Button>
        {showEdit && showEditForm()}
      </div>

      <div>
        {homepage.stories.map(story => {
          return (
            <Container key={story.id} style={{ textAlign: "center" }}>
              <h3>{story.name}</h3>
              <p>{story.content}</p>
              <img
                src={story.imageUrl}
                alt="something cool"
                style={{ maxWidth: "80vw" }}
              />
              <br />
              <Button variant="danger" onClick={() => onDelete(story.id)}>
                DELETE STORY
              </Button>
            </Container>
          );
        })}
      </div>
    </div>
  );
}
