import { React, useState } from "react";
import { useSelector } from "react-redux";
//import Container from "react-bootsrap/Container";
import { Button, Form } from "react-bootstrap";
//import { Link } from "react-router-dom";
// import { getDate } from "@wojtekmaj/date-utils";
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
  const user = useSelector((state) => state.currentUser);

  const [userName, setUserName] = useState(user.userName);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("https://via.placeholder.com/150/");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = "active";
  const [lastUpdated, setLastUpdated] = useState(Date());

  const onFormSubmit = (e) => {
    e.preventDefault();
    let editedProfile = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      image: image,
      password: password,
      birthday: birthday,
      gender: gender,
      email: email,
      city: city,
      country: country,
      lastUpdated: lastUpdated,
    };
    console.log(editedProfile);
  };

  // const clearFields = (params) => {

  // }
  return (
    <div>
      <div className="user-profile">
        <h1> Hello, {user.userName}</h1>
        <p>Edit your profile here</p>
        <Button>Edit Profile</Button>
        <Form>
          {/* username */}
          <label for="userName">
            How do you want to be called?
            <input
              id="userName"
              name="userName"
              type="text"
              defaultValue={user.userName}
              value={user.userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </label>
          {/* firstName */}
          <label for="firstName">
            First Name
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>{" "}
          </label>
          {/* lastName */}
          <label for="lastName">
            Last Name
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </label>
          {/* email */}
          <label for="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              defaultValue=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
          {/* status, if you want to deactivate? */}
          <label for="status">
            Account Status
            <input
              id="status"
              name="status"
              type="text"
              defaultValue=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            ></input>
          </label>
          {/* password */}
          <label for="password">
            Password
            <input
              id="password"
              name="password"
              type="text"
              defaultValue=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>

          {/* //   image */}
          <label for="image">
            Profile Picture
            <input
              id="image"
              name="image"
              type="url"
              defaultValue=""
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></input>
          </label>
          {/* birthday */}
          <label for="birthday">
            Date of Birth
            <input
              id="birthday"
              name="birthday"
              type="date"
              defaultValue=""
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            ></input>
          </label>
          {/* gender */}

          <label for="gender">
            Pronouns
            <input
              id="gender"
              name="gender"
              type="text"
              defaultValue=""
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            ></input>
          </label>
          {/* country */}
          <label for="country">
            Country of Residence
            <input
              id="country"
              name="country"
              type="text"
              defaultValue=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </label>
          {/* city */}
          <label for="city">
            City
            <input
              id="city"
              name="city"
              type="text"
              defaultValue=""
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </label>

          {/* submit */}
          <input type="submit" onClick={onFormSubmit}></input>

          {/* lastUpdated */}
          <label for="lastupdated">
            Last Updated:
            <input
              disabled
              id="lastupdated"
              name="lastUpdated"
              type="text"
              defaultValue=""
              value={user.lastUpdated}
              onChange={(e) => setLastUpdated(e.target.value)}
            ></input>
          </label>

          {/* dateCreated */}
          <label for="dateCreated">
            Account Created
            <input
              disabled
              id="dateCreated"
              name="dateCreated"
              type="date"
              defaultValue={user.dateCreated}
            />
          </label>
        </Form>
        <br />
      </div>
    </div>
  );
};

export default Profile;
