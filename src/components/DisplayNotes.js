import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Button, Modal, Card } from "react-bootstrap";
import axios from "axios";
import NewNoteForm from "./NewNoteForm";

const DisplayNotes = () => {
  const user = useSelector((state) => state.currentUser);
  //const notes = useSelector((state) => state.allUserNotes);
  const noteToEdit = useSelector((state) => state.noteToEdit);
  const allNotes = useSelector((state) => state.allUserNotes);

  const dispatch = useDispatch();

  //For modal
  const [editTitle, setEditTitle] = useState(noteToEdit.title);
  const [editBody, setEditBody] = useState(noteToEdit.body);
  const [editTags, setEditTags] = useState(noteToEdit.tags);

  const [editcategory, setCategory] = useState("personal");
  const [type, setType] = useState("note"); // other types are task and event
  const [date, setDate] = useState("");
  const [display, setDisplay] = useState(true);
  const [by, setBy] = useState("");

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //modal
  const onClickCancelHandler = () => {
    clearFields("");
    handleClose("");
  };

  const clearFields = () => {
    setEditTitle("");
    setEditBody("");
    setEditTags("");
    setCategory("");
    setType("");
    setDate("");
  };

  useEffect(() => {
    axios.get("http://localhost:8080/notes").then((res) => {
      console.log(res.data);
      console.log("notes updated");
      dispatch({ type: "ALL_USER_NOTES", payload: res.data });
    });
  }, []);

  useEffect(() => {
    console.log("something in note to edit");
  }, [noteToEdit]);

  const updateUserNotes = (res) => {
    axios.get("http://localhost:8080/notes").then((res) => {
      dispatch({ type: "ALL_USER_NOTES", payload: res.data });
    });
  };

  //CRUD BELOW

  //doesn't yet work
  const onEditButtonHandler = (note) => {
    handleShow();
    console.log(note);
    dispatch({ type: "NOTE_TO_EDIT", payload: note });
    console.log(noteToEdit);
  };

  const onSubmitEditButtonHandler = () => {
    console.log(editTitle, editBody, editTags);
  };

  // hide or soft delete - WORKING!
  const onHideButtonHandler = (noteId) => {
    axios
      .put(`http://localhost:8080/notes/${noteId}/display`, {
        display: false,
      })
      .then((res) => {
        console.log(res.data);
        updateUserNotes();
      });
  };

  //unhide - WORKING
  const onShowButtonHandler = (noteId) => {
    axios
      .put(`http://localhost:8080/notes/${noteId}/display`, {
        display: true,
      })
      .then((res) => {
        console.log(res.data);
        updateUserNotes();
      });
  };

  //   //BUG -TO-DO
  // when the note is deleted, it should also be deleted from user db notes array

  //hard delete - WORKING! as in it updates
  const onDeleteButtonHandler = (noteId) => {
    axios.delete(`http://localhost:8080/notes/${noteId}/delete`).then((res) => {
      console.log(res.data); // confirms note was deleted
      updateUserNotes();
    });
  };

  // get all notes by user
  let filterNotesByUser = allNotes.filter((note) => user._id === note.by);
  // get all displayed notes by user
  let showDisplayedNotes = allNotes.filter((note) => note.display == true);
  // get all hidden notes by user
  let showHiddenNotes = filterNotesByUser.filter(
    (note) => note.display == false
  );

  return (
    <div>
      <div className="note-display-header">
        <NewNoteForm />
      </div>
      <div className="notes-display">
        {user.length === 0 ? (
          <div>Nothing to display. Please log in.</div>
        ) : (
          showDisplayedNotes.map((note) => (
            <>
              <Card key={note._id} id={note._id}>
                <Card.Header>
                  {/* {note._id}
                  {("displayed: ", JSON.stringify(note.display))} */}
                  <Card.Title placeholder="">{note.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{note.body}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="footer-btn">
                    <button
                      className="delete-btn btn"
                      variant="danger"
                      onClick={() => onDeleteButtonHandler(note._id)}
                    >
                      <img
                        src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/20/000000/external-delete-miscellaneous-kiranshastry-solid-kiranshastry.png"
                        alt="delete-icon"
                      />
                    </button>

                    {note.display == true ? (
                      <button
                        className="hide-btn btn"
                        onClick={() => onHideButtonHandler(note._id)}
                      >
                        <img
                          src="https://img.icons8.com/ios-glyphs/20/000000/hide.png"
                          alt="hide-icon"
                        />
                      </button>
                    ) : (
                      <button
                        className="unhide-btn btn"
                        onClick={() => onShowButtonHandler(note._id)}
                      >
                        <img
                          src="https://img.icons8.com/ios-glyphs/20/000000/visible--v1.png"
                          alt="unhide-icon"
                        />
                      </button>
                    )}
                    <button
                      className="edit-btn btn"
                      onClick={() => {
                        onEditButtonHandler(note);
                      }}
                    >
                      <img
                        src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/20/000000/external-edit-miscellaneous-kiranshastry-solid-kiranshastry.png"
                        alt="edit-icon"
                      />
                    </button>
                    <button
                      disabled
                      className="bookmark-btn btn"
                      // onClick={() => {
                      //
                      // }}
                    >
                      <img
                        src="https://img.icons8.com/ios-filled/20/000000/bookmark-ribbon.png"
                        alt="bookmark-icon"
                      />
                    </button>
                  </div>
                </Card.Footer>
              </Card>
            </>
          ))
        )}
      </div>

      {/* EDIT NOTE MODAL -- better if separate component? */}
      {/* does not yet work */}
      <Modal show={show} onHide={handleClose}>
        <Card className="edit-card">
          <Modal.Header>
            <Card.Title>Edit Note</Card.Title>
            <br />
            <Form.Control
              value={editTitle}
              defaultValue={noteToEdit.title}
              as="textarea"
              id="note-title"
              rows={1}
              name="note-title"
              type="text"
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
          </Modal.Header>
          <Modal.Body>
            <Card.Body>
              <Form.Control
                value={editBody}
                defaultValue={noteToEdit.body}
                as="textarea"
                rows={10}
                name="note-body"
                id="note-body"
                type="text"
                onChange={(e) => {
                  setEditBody(e.target.value);
                }}
              />
            </Card.Body>
          </Modal.Body>
          <Modal.Footer>
            <Form.Control
              value={editTags}
              defaultValue={noteToEdit.tags}
              placeholder="Add Tags"
              as="textarea"
              rows={1}
              name="body"
              id="note-tags"
              type="text"
              onChange={(e) => {
                setEditTags(e.target.value);
              }}
            />

            <Button variant="secondary" onClick={onClickCancelHandler}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSubmitEditButtonHandler();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Card>
      </Modal>
    </div>
  );
};

export default DisplayNotes;
