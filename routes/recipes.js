const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const {getAuth} = require("firebase-admin/auth");

// Checks if user can manage recipe
const canManage = (decodedToken, CreatorId) => {
  // If user is creator
  // Or admin
  // Or creator and admin
  if(CreatorId === decodedToken.uid || decodedToken.admin === true || (CreatorId === decodedToken.uid && decodedToken.admin === true)) {
    return true;
  } else {
    return false;
  }
}

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
  await db.collection('recipes').where('authorID', '==', req.params.id).get()
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
      req.body.authorID = UID;
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

// Edits a recipe
router.put('/:id', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      // Get the concerned recipe to check the author ID
      await db.collection('recipes').doc(req.params.id).get()
      .then(async (recipe) => {
        if(!recipe.exists) {
          res.status(400).send('There is no recipe corresponding this ID')
        } else {
          // Check if user can manage this recipe
          if (canManage(decodedToken, recipe.data().authorID)) {
            // Edit the recipe
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
          } else {
            res.status(403).send('You don\'t have the permission to edit this recipe')
          }
        }
      })
      .catch(err => {
        console.log('Error : ', err);
      })
    })
  }
});

// Deletes a recipe
router.delete('/:id', async (req, res) => {
  // check if there is a token
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    // Check the token
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      // Get the concerned recipe to check the author ID
      await db.collection('recipes').doc(req.params.id).get()
      .then(async (recipe) => {
        if(!recipe.exists) {
          res.status(400).send('There is no recipe corresponding this ID')
        } else {
          // Check if user can manage this recipe
          if (canManage(decodedToken, recipe.data().authorID)) {
            // Delete the recipe
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
          } else {
            res.status(403).send('You don\'t have the permission to delete this recipe')
          }
        }
      })
      .catch(err => {
        console.log('Error : ', err);
      })
    })
    .catch((error) => {
      res.status(400).send('Your token is invalid.')
      console.log(error)
    });
  }
});

module.exports = router;