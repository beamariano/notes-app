import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
  //states
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("https://via.placeholder.com/150/");

  const [birthday, setBirthday] = useState(Date);
  const [gender, setGender] = useState("");
  const [pronouns, setPronouns] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [lastUpdated, setLastUpdated] = useState(Date());
  const [dateCreated, setDateCreated] = useState(Date());

  const [confirmPassword, setConfirmPassword] = useState("");

  // form validation
  const [validated, setValidated] = useState(false);

  const history = useHistory();

  //validation
  const onRegisterHandler = () => {
    //first validate email

    if (userName !== "" && password === confirmPassword) {
      //check first if email is in database
      axios
        .post("https://beam-notes-db.herokuapp.com/users/email-exists", {
          emailToCheck: email,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === true) {
            alert("Oops. That account exists. Login or check your email.");
          } else {
            axios
              .post("https://beam-notes-db.herokuapp.com/users/register", {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                status: status,
                password: password,
                image: image,
                birthday: birthday,
                gender: gender,
                pronouns: pronouns,
                country: country,
                city: city,
                lastUpdated: lastUpdated,
                dateCreated: dateCreated,
                notes: [1],
                events: [1],
                tasks: [1],
              })
              .then((res) => {
                alert(res.data);
                history.push("/login");
              });
          }
        });
    } else {
      if (userName === "") {
        alert("Name cannot be blank");
      }
      if (password !== confirmPassword) {
        alert("passwords do not match");
      }
    }
  };

  return (
    <div className="register-box">
      <h2>Sign-up</h2>
      <Form noValidate validated={validated}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            controlId="formBasicName"
            type="name"
            placeholder="Enter Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            controlId="formBasicEmail"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            controlId="formBasicPassword"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            controlId="formBasicPassword"
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Form.Text className="text-muted">Just to double check.</Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            onRegisterHandler();
          }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
