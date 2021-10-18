import { useSelector, useDispatch } from "react-redux";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import NewNoteForm from "./NewNoteForm";
import axios from "axios";

const DisplayHiddenNotes = () => {
  const user = useSelector((state) => state.currentUser);
  const allNotes = useSelector((state) => state.allUserNotes);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://beam-notes-db.herokuapp.com/notes").then((res) => {
      console.log(res.data);
      console.log("notes updated");
      dispatch({ type: "ALL_USER_NOTES", payload: res.data });
    });
  }, []);

  const updateUserNotes = (res) => {
    axios.get("https://beam-notes-db.herokuapp.com/notes").then((res) => {
      dispatch({ type: "ALL_USER_NOTES", payload: res.data });
    });
  };

  //unhide
  const onShowButtonHandler = (noteId) => {
    axios
      .put(`https://beam-notes-db.herokuapp.com/notes/${noteId}/display`, {
        display: true,
      })
      .then((res) => {
        console.log(res.data);
        updateUserNotes();
      });
  };

  //hard delete - WORKING! as in it updates
  const onDeleteButtonHandler = (noteId) => {
    console.log(noteId, "delete??");
    axios
      .delete(`https://beam-notes-db.herokuapp.com/notes/${noteId}/delete`)
      .then((res) => {
        console.log(res.data); // confirms note was deleted
        updateUserNotes();
      });
  };

  let filterNotesByUser = allNotes.filter((note) => user._id === note.by);
  let showHiddenNotes = filterNotesByUser.filter(
    (note) => note.display === false
  );

  return (
    <div>
      <div className="note-display-header">
        <NewNoteForm />
        <Link to="/notes">Back to Visible Notes</Link>
      </div>
      <div className="notes-display">
        {user.length === 0 ? (
          <div>Nothing to display. Please log in.</div>
        ) : (
          showHiddenNotes.map((note) => (
            <>
              <Card key={note._id} id={note._id} className="rounded">
                <Card.Header>
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
                      {/* Delete */}
                    </button>

                    {note.display === true ? (
                      ""
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
                      // onClick={() => {
                      //   onEditButtonHandler(note);
                      // }}
                    >
                      <img
                        src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/20/000000/external-edit-miscellaneous-kiranshastry-solid-kiranshastry.png"
                        alt="edit-icon"
                      />
                    </button>
                  </div>
                </Card.Footer>
              </Card>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayHiddenNotes;
