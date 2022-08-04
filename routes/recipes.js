const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

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
    process.exit();
  })
});

router.get('/:id', async (req, res) => {
  await db.collection('recipes').doc(req.params.id).get()
  .then(recipe => {
    if(!recipe.exists) {
      res.status(404).send('There is no recipe corresponding this ID')
    } else {
      const data = {}
      data.id = recipe.id;
      data.data = recipe.data();
      res.status(200).send(data);
    }
  })
  .catch(err => {
    console.log('Error : ', err);
    process.exit();
  })
});

// TODO : Check user auth
router.post('/', async (req, res) => {
  await db.collection('recipes').add(req.body)
  .then(function() {
    res.status(200).send('Recipe added successfully !')
  })
  .catch(err => {
    console.log('Error : ', err);
    process.exit();
  })
});

// TODO : Check user auth
router.put('/:id', async (req, res) => {
  await db.collection('recipes').doc(req.params.id).update(req.body)
  .then(function() {
    res.status(200).send('Recipe updated successfully !')
  })
  .catch(err => {
    console.log('Error : ', err);
    if(err.code == 5) {
      res.status(404).send('There is no recipe corresponding this ID')
    }
    process.exit();
  })
});

module.exports = router;