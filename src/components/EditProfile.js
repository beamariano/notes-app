import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Form } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import axios from "axios";

const EditProfile = () => {
  const user = useSelector((state) => state.currentUser);

  const [userName, setUserName] = useState(user.userName);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [image, setImage] = useState(user.image);
  const [password, setPassword] = useState(user.password);
  const [birthday, setBirthday] = useState(user.birthday);
  const [gender, setGender] = useState(user.gender);
  const [pronouns, setPronouns] = useState(user.pronouns);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [status, setStatus] = useState(user.status);
  const [dateCreated, setDateCreated] = useState(user.dateCreated);
  const [lastUpdated, setLastUpdated] = useState(Date());

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${user._id}`).then((res) => {
      console.log(res.data);
      dispatch({ type: "FETCH_USER_METADATA", payload: res.data });
    });
  }, []);

  const fetchUserData = () => {
    axios.get(`http://localhost:8080/users/${user._id}`).then((res) => {
      console.log(res.data);
      dispatch({ type: "FETCH_USER_METADATA", payload: res.data });
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    // let editedProfile = {
    //   userName: userName,
    //   firstName: firstName,
    //   lastName: lastName,
    //   image: image,
    //   password: password,
    //   birthday: birthday,
    //   gender: gender,
    //   pronouns: pronouns,
    //   email: email,
    //   city: city,
    //   country: country,
    //   lastUpdated: lastUpdated,
    // };
    // console.log(editedProfile);
    axios
      .put(`http://localhost:8080/notes/${user._id}/edit-profile`, {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        image: image,
        password: password,
        birthday: birthday,
        gender: gender,
        pronouns: pronouns,
        email: email,
        city: city,
        country: country,
        lastUpdated: lastUpdated,
      })
      .then((res) => {
        console.log(res.data);
      });
    fetchUserData();
  };

  const getCountry = (selectedCountry) => {
    console.log(selectedCountry);
    setCountry(selectedCountry);
  };

  return (
    <div className="profile-box">
      <h1> Hello, {user.userName}</h1>
      <p>Edit your profile here</p>
      {/* <Button>Edit Profile</Button> */}
      <Row className="profile-box-details">
        <Col className="left-col">
          <div className="profile-image">
            <img
              id={user.userName + "image"}
              className="profile-image"
              src="https://img.icons8.com/pastel-glyph/100/000000/person-male--v3.png"
              alt={user.userName + "image"}
            />
            <Form>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Change Profile Picture</Form.Label>
                <br />
                <Form.Control type="file" size="sm" id="image" />
              </Form.Group>
            </Form>
          </div>
          <br />
          <div>
            <Form>
              {/* password */}
              <Button variant="warning">Change Password</Button>
              {/* <Form.Group>
                <Form.Label for="password">
                  Password
                  <Form.Control
                    id="password"
                    name="password"
                    type="text"
                    defaultValue=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group> */}
              {/* status, if you want to deactivate? */}
              <br />
              <br />
              <Form.Group>
                <Form.Label for="status">
                  Account Status
                  <Form.Control
                    size="sm"
                    disabled
                    id="status"
                    name="status"
                    type="text"
                    defaultValue=""
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>
              {/* lastUpdated */}
              <Form.Group>
                <Form.Label for="lastupdated">
                  Last Updated:
                  <Form.Control
                    size="sm"
                    disabled
                    id="lastupdated"
                    name="lastUpdated"
                    type="text"
                    defaultValue={user.lastUpdated}
                    value={user.lastUpdated}
                    onChange={(e) => setLastUpdated(e.target.value)}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>
              {/* dateCreated */}
              <Form.Group>
                <Form.Label for="dateCreated">
                  Account Created
                  <Form.Control
                    size="sm"
                    disabled
                    id="dateCreated"
                    name="dateCreated"
                    type="text"
                    defaultValue={user.dateCreated}
                  ></Form.Control>
                </Form.Label>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col className="right-col">
          <div className="profile-details">
            <Form>
              {/* username */}
              <Form.Group>
                <Form.Label for="userName">
                  How would you like to be called?
                  <Form.Control
                    id="userName"
                    name="userName"
                    type="text"
                    defaultValue={user.userName}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Label>
              </Form.Group>
            </Form>
            <Form>
              <Row>
                <Col>
                  {/* gender */}
                  <Form.Group>
                    <Form.Label for="gender">
                      How do you identity?
                      <Form.Control
                        id="gender"
                        name="gender"
                        type="text"
                        defaultValue=""
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      ></Form.Control>
                    </Form.Label>
                  </Form.Group>
                </Col>
                {/* pronouns */}
                <Col>
                  <Form.Group>
                    <Form.Label for="pronouns">
                      Your Pronouns
                      <Form.Control
                        id="pronouns"
                        name="pronoun"
                        type="text"
                        defaultValue=""
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                      ></Form.Control>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <br />
            <Form>
              <Row>
                <Col>
                  {/* firstName */}
                  <Form.Group>
                    <Form.Label for="firstName">
                      First Name
                      <Form.Control
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue=""
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      ></Form.Control>
                    </Form.Label>
                  </Form.Group>
                </Col>
                {/* lastName */}
                <Col>
                  <Form.Group>
                    <Form.Label for="lastName">
                      Last Name
                      <Form.Control
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue=""
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      ></Form.Control>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Form>
              {/* email */}
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label for="email">
                      Email
                      <Form.Control
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={user.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                      <br />
                    </Form.Label>
                  </Form.Group>
                </Col>
                <Col>
                  {/* birthday */}
                  <Form.Group>
                    <Form.Label for="birthday">
                      Date of Birth
                      <Form.Control
                        id="birthday"
                        name="birthday"
                        type="date"
                        defaultValue=""
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      ></Form.Control>
                      <br />
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Form>
              <Row>
                <Col>
                  {/* country -- could be separate component or get from a dependency*/}
                  <Form.Group>
                    <Form.Label for="country" id="country">
                      Select Country
                      <select
                        className="form-control"
                        name="country"
                        type="country"
                        value={country}
                        onChange={(e) => getCountry(e.target.value)}
                        //onClick={(e) }}
                      >
                        <option value="Select One" disabled>
                          Choose One
                        </option>
                        <option value="Åland Islands">Åland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegovina">
                          Bosnia and Herzegovina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos (Keeling) Islands">
                          Cocos (Keeling) Islands
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo, The Democratic Republic of The">
                          Congo, The Democratic Republic of The
                        </option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (Malvinas)">
                          Falkland Islands (Malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guernsey">Guernsey</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-bissau">Guinea-bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard Island and Mcdonald Islands">
                          Heard Island and Mcdonald Islands
                        </option>
                        <option value="Holy See (Vatican City State)">
                          Holy See (Vatican City State)
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran, Islamic Republic of">
                          Iran, Islamic Republic of
                        </option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea, Democratic People's Republic of">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="Korea, Republic of">
                          Korea, Republic of
                        </option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao People's Democratic Republic">
                          Lao People's Democratic Republic
                        </option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">
                          Libyan Arab Jamahiriya
                        </option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macao">Macao</option>
                        <option value="Macedonia, The Former Yugoslav Republic of">
                          Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States of">
                          Micronesia, Federated States of
                        </option>
                        <option value="Moldova, Republic of">
                          Moldova, Republic of
                        </option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">
                          Netherlands Antilles
                        </option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestinian Territory, Occupied">
                          Palestinian Territory, Occupied
                        </option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">
                          Russian Federation
                        </option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Helena">Saint Helena</option>
                        <option value="Saint Kitts and Nevis">
                          Saint Kitts and Nevis
                        </option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Pierre and Miquelon">
                          Saint Pierre and Miquelon
                        </option>
                        <option value="Saint Vincent and The Grenadines">
                          Saint Vincent and The Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">
                          Sao Tome and Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia and The South Sandwich Islands">
                          South Georgia and The South Sandwich Islands
                        </option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard and Jan Mayen">
                          Svalbard and Jan Mayen
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">
                          Syrian Arab Republic
                        </option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania, United Republic of">
                          Tanzania, United Republic of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-leste">Timor-leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos Islands">
                          Turks and Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">
                          United States Minor Outlying Islands
                        </option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Viet Nam">Viet Nam</option>
                        <option value="Virgin Islands, British">
                          Virgin Islands, British
                        </option>
                        <option value="Virgin Islands, U.S.">
                          Virgin Islands, U.S.
                        </option>
                        <option value="Wallis and Futuna">
                          Wallis and Futuna
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </Form.Label>
                  </Form.Group>
                  {/* city */}
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label for="city">
                      City
                      <Form.Control
                        id="city"
                        name="city"
                        type="text"
                        defaultValue=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      ></Form.Control>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            {/* submit */}
            <div className="d-grid gap-2">
              <Button
                className="profile-submit-edit"
                variant="info"
                size="lg"
                onClick={onFormSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
