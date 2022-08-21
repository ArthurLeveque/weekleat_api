const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const {getAuth} = require("firebase-admin/auth");
const db = admin.firestore();

//TODO : A SUPPRIMER
router.put('/:id', async (req, res) => {
  getAuth()
  .setCustomUserClaims(req.params.id, { admin: true })
  .then(() => res.status(200).send('C\'est bon'))
  .catch((e) => {
    console.log(e);
    res.status(400).send('marche pas')
  });
});

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