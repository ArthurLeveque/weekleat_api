const http = require('http')
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./firebase_config/weekleat-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const recipesRoute = require('./routes/recipesController');

app.use('/recipes', recipesRoute);

app.listen(5500, console.log('API ready !'));


// *~~~~~~~~~~~~~~SERVIRA POUR MISE EN PROD SUR HEROKU~~~~~~~~~~~~~~*

// http.createServer(function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"})
//   response.end("Hello World with index.js !\n")
// }).listen(process.env.PORT)