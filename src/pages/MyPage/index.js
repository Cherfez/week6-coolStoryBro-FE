import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import StoryForm from "../../components/StoryForm";
import { selectToken } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import EditForm from "../../components/EditForm";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";

export default function MyPage() {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { token, homepage, id } = useSelector(selectUser);
  console.log("homepage?", homepage);

  // const token = useSelector(selectToken);
  // console.log("token", token);

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
    </div>
  );
}
