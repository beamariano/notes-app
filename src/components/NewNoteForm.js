import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap/";
import axios from "axios";

const NewNoteForm = () => {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("personal");
  const [type, setType] = useState("note"); // other types are task and event
  const [display, setDisplay] = useState(true);
  const [tags, setTags] = useState("sample tags");
  const [dateCreated, setDateCreated] = useState(Date());
  const [dateModified, setDateModified] = useState(Date());

  const [by, setBy] = useState(user._id);

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clearFields = () => {
    setTitle("");
    setBody("");
    setCategory("");
    setType("");
  };

  const onClickCancelHandler = () => {
    clearFields("");
    handleClose("");
  };

  const fetchNewNotes = () => {
    axios.get("http://localhost:8080/notes").then((res) => {
      dispatch({ type: "ALL_USER_NOTES", payload: res.data });
    });
  };

  const onClickAddHandler = () => {
    axios
      .post(`http://localhost:8080/notes/${user._id}/new`, {
        title: title,
        body: body,
        category: category,
        display: display,
        type: type,
        tags: tags,
        dateCreated: dateCreated,
        dateModified: dateModified,
        by: by,
      })
      .then((res) => {
        console.log("NEW NOTE ADDED: ", res.data);
        fetchNewNotes();
      });

    //clear form
    handleClose();
  };

  return (
    <>
      <button
        className="new-note-btn"
        variant="btn btn-outline-secondary"
        onClick={handleShow}
      >
        <img
          alt="create-icon"
          src="https://img.icons8.com/cotton/40/000000/create-new--v5.png"
        />
        New Note
      </button>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Form>
            <Modal.Header className="note-header">
              <Modal.Title>
                <Form.Group className="mb-3" controlId="header">
                  <Form.Control
                    placeholder="[Title]"
                    rows={10}
                    name="title"
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Form.Group>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="note-body">
              <Form.Group className="mb-3" controlId="body">
                <Form.Control
                  placeholder="Your Notes Here"
                  as="textarea"
                  rows={10}
                  name="body"
                  type="text"
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="note-footer">
              <Button variant="secondary" onClick={onClickCancelHandler}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onClickAddHandler}>
                Add Note
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default NewNoteForm;
