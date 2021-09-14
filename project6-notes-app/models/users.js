const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  status: String,
  password: String,
  image: String,
  birthday: Date,
  gender: String,
  pronouns: String,
  country: String,
  city: String,
  lastUpdated: Date,
  dateCreated: Date,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  events: Array,
  tasks: Array,
});

module.exports = mongoose.model("User", usersSchema);
