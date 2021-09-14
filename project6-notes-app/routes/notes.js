const router = require("express").Router();
const User = require("../models/users");
const Note = require("../models/notes");
const bcrypt = require("bcrypt");

//creates new note at notes/:id/new and saves it in the notes db. in the db user, mongoose will find the user with the same id similar to the one in the parameter. then, it will push the id of the new note to the notes array.
router.post("/:id/new", (req, res) => {
  let newNote = new Note(req.body);
  newNote.save().then((data) => {
    //this part doesn't work
    // User.findByIdAndUpdate(req.params.id, {
    //   $push: { notes: data._id },
    // });
    return res.send(data);
  });
});

//the above doesn't work

//see all notes
router.get("/", (req, res) => {
  Note.find().then((data) => {
    res.send(data);
  });
});

//get details from one note by its note id
router.get("/:id", (req, res) => {
  Note.findById(req.params.id).then((data) => {
    res.send(data);
  });
});

router.put("/:id/", (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body).then((data) => {
    return res.send(data);
  });
});

// hides note or soft delete - WORKING
router.put("/:id/display", (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body).then((data) => {
    if (req.body.display == true) {
      return res.send("note hidden");
    }
    if (req.body.display == false) {
      return res.send("note hidden");
    }
  });
});

//delete - WORKING
router.delete("/:id/delete", (req, res) => {
  Note.deleteOne({ _id: req.params.id }).then((data) => {
    if (data.deletedCount) {
      res.send("Record deleted");
    } else {
      res.send("Record not found");
    }
  });
});

module.exports = router;
