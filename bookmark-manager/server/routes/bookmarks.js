const router = require('express').Router();
let Bookmark = require('../models/Bookmark');

// Route to get all bookmarks for a user
router.route('/').get((req, res) => {
  const userId = req.query.userId;
  Bookmark.find({ userId })
    .then(bookmarks => res.json(bookmarks))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new bookmark
router.route('/add').post((req, res) => {
  const userId = req.body.userId;
  const url = req.body.url;
  const title = req.body.title;
  const folder = req.body.folder;
  const tags = req.body.tags;

  const newBookmark = new Bookmark({ userId, url, title, folder, tags });

  newBookmark.save()
    .then(() => res.json('Bookmark added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
