const router = require("express").Router();
const User = require("../models/users");
const Note = require("../models/users");
const bcrypt = require("bcrypt");

//AUTHENTICATION
//checks if email exists
router.post("/email-exists", (req, res) => {
  User.findOne({ email: req.body.emailToCheck }).then((data) => {
    if (data) {
      res.send(true);
      // email is in db
    } else {
      res.send("Not in database");
      // email is not in db, free to register
    }
  });
});
router.post("/register", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    status: req.body.status,
    password: hashedPassword,
    image: req.body.image,
    birthday: req.body.birthday,
    gender: req.body.gender,
    city: req.body.city,
    country: req.body.container,
    lastUpdated: req.body.lastUpdated,
    dateCreated: req.body.dateCreated,
    // name: req.body.name,
    // email: req.body.email,
    // password: hashedPassword,
  };
  let newUser = new User(user);
  newUser.save().then((data) => {
    res.send("New user created");
  });
});
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(async (data) => {
    if (data) {
      let found = await bcrypt.compare(req.body.password, data.password);
      // Check if password matches with the found user
      if (found) {
        res.send(data);
        console.log(data);
      } else {
        res.send({ error: "Invalid credentials" });
      }
    }
  });
});

// CRUD BELOW

//get all data from all users
router.get("/", (req, res) => {
  User.find().then((data) => {
    res.send(data);
  });
});

//edits user data
router.put("/:id/addnote", (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    $push: {
      notes: req.body,
    },
  }).then((data) => {
    console.log(data);
    return res.send(data);
  });
});

// get user data w/o populating
router.get("/:id/", (req, res) => {
  User.find({ _id: req.params.id }).then((data) => {
    console.log(data);
    return res.send(data);
  });
});

//update profile
router.put("/:id/edit-profile", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then((data) => {
    console.log(req.body);
    //console.log(res.data);
    return res.send(data);
  });
});

//get populated data from a user
router.get("/:id/", (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("notes")
    .exec((err, data) => {
      console.log("populated: ", data);
      return data;
    });
});

module.exports = router;
