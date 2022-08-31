const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const {getAuth} = require("firebase-admin/auth");

// Deletes user, his/her list and favorites
router.delete('/', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      const UID = decodedToken.uid;
      await getAuth()
      .deleteUser(UID)
      .then(() => {
        res.status(200).send('User succesfully deleted');
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
        res.status(400).send('An error happened while we tried to delete your account.');
      });
      // For each collections, we get all where authorID to be sure to delete all data if there was a bug that created multiple items
      await db.collection('favorites').where('authorID', '==', UID).get()
      .then(async (favorites) => {
        favorites.forEach(async doc => {
          await db.collection('favorites').doc(doc.id).delete();
        })
      })
      await db.collection('lists').where('authorID', '==', UID).get()
      .then(async (lists) => {
        lists.forEach(async doc => {
          await db.collection('lists').doc(doc.id).delete();
        })
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send('Your token is invalid.');
    }); 
  }
});

module.exports = router;