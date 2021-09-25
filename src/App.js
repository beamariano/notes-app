import "./App.css";
import { Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Col, Row, Toast } from "react-bootstrap";

import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import DisplayNotes from "./components/DisplayNotes";
import DisplayHiddenNotes from "./components/DisplayHiddenNotes";

const App = () => {
  const user = useSelector((state) => state.currentUser);

  const [show, setShow] = useState(true);

  const refreshPage = () => {
    window.location.assign("http://localhost:3000");
  };

  const welcomeGuest = () => {
    return (
      <>
        <Row>
          <Col xs={6}>
            <Toast
              className="welcome-box toastGuest"
              onClose={() => setShow(false)}
              show={show}
              delay={5000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Hi there!</strong>
              </Toast.Header>
              <Toast.Body>
                <p>Welcome, Guest User!</p>
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div className="App">
      {user.length === 0 ? welcomeGuest() : ""}
      <Route path="/">
        <Navbar fixed="top" bg="light" expand="sm">
          <Navbar.Brand className="app-title" onClick={refreshPage}>
            <h1>Notes App</h1>
          </Navbar.Brand>
          {user.length === 0 ? (
            <div className="welcome-display">
              <p>You are not logged in.</p>
              <p>
                Click <Link to="/login">here</Link> to login.
              </p>
              <p>
                Or register <Link to="/register">here</Link>.
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="menu-box">
            {user.length !== 0 ? (
              <div>
                <Link to="/profile">Edit Profile</Link>
                <br />
                <Link to="/notes">View Notes</Link>
                <br />
                <Link to="/hidden-notes">View Hidden Notes</Link>
                <br />{" "}
              </div>
            ) : (
              ""
            )}
            <br />
          </div>
          <div>
            {user.length !== 0 ? (
              <>
                <div className="authentication-box">
                  <Link onClick={refreshPage} to="/">
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </Navbar>
      </Route>
      <main>
        <div className="main-display">
          <Route exact path="/">
            <div className="authentication-box">
              <Register /> <Login />
            </div>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/notes">
            <DisplayNotes />
          </Route>
          <Route exact path="/hidden-notes">
            <DisplayHiddenNotes />
          </Route>
          <Route exact path="/profile">
            <EditProfile />
          </Route>
        </div>
      </main>
    </div>
  );
};

export default App;

//Icons from: https://icons8.com/
