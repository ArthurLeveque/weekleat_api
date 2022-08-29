const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const {getAuth} = require("firebase-admin/auth");

// Returns a user's favorites
router.get('/user/:id', async (req, res) => {
  await db.collection('favorites').where('authorID', '==', req.params.id).get()
  .then(favorites => {
    if(favorites.empty) {
      res.status(402).send('There is no favorites corresponding this ID')
    } else {
      data = {
        id: favorites.docs[0].id,
        data: favorites.docs[0].data()
      }
      res.status(200).send(data);
    }
  })
  .catch(err => {
    console.log('Error : ', err);
  })
});

// Creates a favorites list
router.post('/', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      const UID = decodedToken.uid;
      req.body.authorID = UID;
      await db.collection('favorites').add(req.body)
      .then( response => {
        res.status(200).send(response.id);
      })
      .catch(err => {
        console.log('Error : ', err);
        process.exit();
      })
    })
    .catch((error) => {
      res.status(400).send('Your token is invalid.')
      console.log(error)
    }); 
  }
});

// Edits a favorites list
router.put('/:id', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async () => {
      await db.collection('favorites').doc(req.params.id).update(req.body)
      .then(() => {
        res.status(200).send('List updated successfully !')
      })
      .catch(err => {
        console.log('Error : ', err);
        if(err.code == 5) {
          res.status(400).send('There is no favorites corresponding this ID')
        }
      })
    })
    .catch((error) => {
      res.status(400).send('Your token is invalid.')
      console.log(error)
    }); 
  }
});

module.exports = router;