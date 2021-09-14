const express = require("express");
const app = express();
const port = 8080;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/notesApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is the Notes App Server Homepage.");
});

// ROUTERS AND MODELS
const userRouter = require("./routes/users");
app.use("/users/", userRouter);

const noteRouter = require("./routes/notes");
app.use("/notes/", noteRouter);

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
