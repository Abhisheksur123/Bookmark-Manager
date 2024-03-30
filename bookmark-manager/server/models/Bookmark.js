const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  url: { type: String, required: true },
  title: { type: String, required: true },
  folder: { type: String },
  timestamp: { type: Date, default: Date.now },
  tags: [{ type: String }],
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
