const express = require('express');
const router = express.Router();
const {getAuth} = require("firebase-admin/auth");

// Checks if user is an admin
router.get('/:id', async (req, res) => {
  getAuth()
  .getUser(req.params.id)
  .then(() => {
      res.status(200).send('This user is an admin');
  })
  .catch((e) => {
    console.log(e);
    res.status(400).send('This user is not an admin');
  });
});

module.exports = router;