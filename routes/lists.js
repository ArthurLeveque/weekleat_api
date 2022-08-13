const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// TODO : Check user auth
// Returns a list
router.get('/:id', async (req, res) => {
  await db.collection('lists').doc(req.params.id).get()
  .then(list => {
    if(!list.exists) {
      res.status(400).send('There is no list corresponding this ID')
    } else {
      res.status(200).send(list.data());
    }
  })
  .catch(err => {
    console.log('Error : ', err);
  })
});

// TODO : Check user auth + PENSER A METTRE ID UTILISATEUR EN ID
// Adds a list
router.post('/', async (req, res) => {
  await db.collection('lists').add(req.body)
  .then(function() {
    res.status(200).send('List added successfully !')
  })
  .catch(err => {
    console.log('Error : ', err);
  })
});

// TODO : Check user auth
// Edits a list
router.put('/:id', async (req, res) => {
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