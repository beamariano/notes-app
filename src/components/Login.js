import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form validation
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    axios
      .post("http://localhost:8080/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!res.data.error) {
          alert("Log-in success!");
          dispatch({ type: "FETCH_USER_METADATA", payload: res.data });
          history.push("/notes");
        } else {
          alert(res.data.error);
        }
      });
  };

  return (
    <div className="login-box">
      <h2>Log-in</h2>
      <p>Already registered? Login to start.</p>
      <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <div className="invalid-feedback">Please enter a valid email.</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={onSubmitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
