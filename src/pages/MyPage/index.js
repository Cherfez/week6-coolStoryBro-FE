import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import StoryForm from "../../components/StoryForm";
import { selectToken } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import EditForm from "../../components/EditForm";

export default function MyPage() {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const token = useSelector(selectToken);
  console.log("token", token);

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

  return (
    <div>
      <Button onClick={clickHandleForm}>Post a cool story, Bro</Button>
      {showForm && showStoryForm()}

      <Button onClick={clickHandleEdit}>Edit your page, Bro</Button>
      {showEdit && showEditForm()}
    </div>
  );
}
