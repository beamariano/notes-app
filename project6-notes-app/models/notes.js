const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: String,
  body: String,
  category: String,
  type: String,
  display: Boolean,
  tags: Array,
  dateCreated: Date,
  dateModified: Date,
  authorId: String,
});

module.exports = mongoose.model("Note", notesSchema);
