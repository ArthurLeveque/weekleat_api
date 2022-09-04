const http = require('http');
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key.replace(/\\n/g, '\n'),
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const recipesRoute = require('./routes/recipes');
const listsRoute = require('./routes/lists');
const adminsRoute = require('./routes/admins');
const subscriptionsRoute = require('./routes/subscriptions');
const favoritesRoute = require('./routes/favorites');
const usersRoute = require('./routes/users');



// app.listen(5500, console.log('API ready !'));

// http.createServer(function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"})
//   response.end("Hello World with index.js !\n")

  app.use(express.json());
  app.use('/recipes', recipesRoute);
  app.use('/lists', listsRoute);
  app.use('/admins', adminsRoute);
  app.use('/subscriptions', subscriptionsRoute);
  app.use('/favorites', favoritesRoute);
  app.use('/users', usersRoute);
// }).listen(process.env.PORT)