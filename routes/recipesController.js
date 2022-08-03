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

module.exports = router;