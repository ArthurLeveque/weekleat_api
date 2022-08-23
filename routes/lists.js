const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const {getAuth} = require("firebase-admin/auth");

// Returns a user's list
router.get('/user/:id', async (req, res) => {
  await db.collection('lists').where('authorID', '==', req.params.id).get()
  .then(list => {
    if(list.empty) {
      res.status(400).send('There is no list corresponding this ID')
    } else {
      res.status(200).send(list.docs[0].data());
    }
  })
  .catch(err => {
    console.log('Error : ', err);
  })
});

// Adds a list
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
      await db.collection('lists').add(req.body)
      .then(function() {
        res.status(200).send('List added successfully !')
      })
      .catch(err => {
        console.log('Error : ', err);
        res.status(401).send('An error occured with Firebase')
      })
    })
    .catch((error) => {
      res.status(400).send('Your token is invalid.')
      console.log(error)
    });
  }
});

// TODO : Check user auth
// Edits a list
router.put('/:id', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      await db.collection('lists').doc(req.params.id).update(req.body)
      .then(function() {
        res.status(200).send('List updated successfully !')
      })
      .catch(err => {
        console.log('Error : ', err);
        if(err.code == 5) {
          res.status(400).send('There is no list corresponding this ID')
        }
      })
    })
    .catch((error) => {
      res.status(400).send('Your token is invalid.')
      console.log(error)
    }); 
  }
});

// TODO : Check user auth
router.delete('/:id', async (req, res) => {
  await db.collection('lists').doc(req.params.id).delete()
  .then(function() {
    res.status(200).send('List deleted successfully !')
  })
  .catch(err => {
    console.log('Error : ', err);
    if(err.code == 5) {
      res.status(400).send('There is no list corresponding this ID')
    }
  })
});

module.exports = router;