const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const {getAuth} = require("firebase-admin/auth");

// Returns all recipes
router.get('/', async (req, res) => {
  await db.collection('recipes').get()
  .then(recipes => {
    let allData = [];
  
    recipes.forEach((recipe) => {
      const data = {}
      data.id = recipe.id;
      data.data = recipe.data();
      allData.push(data);
    });
    res.status(200).send(allData)
  })
  .catch(err => {
    console.log('Error : ', err);
  })
});

// Returns a specific recipe
router.get('/:id', async (req, res) => {
  await db.collection('recipes').doc(req.params.id).get()
  .then(recipe => {
    if(!recipe.exists) {
      res.status(400).send('There is no recipe corresponding this ID')
    } else {
      const data = {}
      data.id = recipe.id;
      data.data = recipe.data();
      res.status(200).send(data);
    }
  })
  .catch(err => {
    console.log('Error : ', err);
  })
});

// Returns all recipes from user
router.get('/user/:id', async (req, res) => {
  await db.collection('recipes').where('uid', '==', req.params.id).get()
  .then(recipes => {
    let allData = [];
  
    recipes.forEach((recipe) => {
      const data = {}
      data.id = recipe.id;
      data.data = recipe.data();
      allData.push(data);
    });
    res.status(200).send(allData)
  })
  .catch(err => {
    console.log('Error : ', err);
  })
});

// Adds a recipe
router.post('/', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      const UID = decodedToken.uid;
      req.body.uid = UID;
      await db.collection('recipes').add(req.body)
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

// TODO : Check user auth
// Edits a recipe
router.put('/:id', async (req, res) => {
  await db.collection('recipes').doc(req.params.id).update(req.body)
  .then(function() {
    res.status(200).send('Recipe updated successfully !')
  })
  .catch(err => {
    console.log('Error : ', err);
    if(err.code == 5) {
      res.status(400).send('There is no recipe corresponding this ID')
    }
  })
});

// Deletes a recipe
router.delete('/:id', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async () => {
      await db.collection('recipes').doc(req.params.id).delete()
      .then(function() {
        res.status(200).send('Recipe deleted successfully !')
      })
      .catch(err => {
        console.log('Error : ', err);
        if(err.code == 5) {
          res.status(400).send('There is no recipe corresponding this ID')
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