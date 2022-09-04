const express = require('express');
const app = express();
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const expressJSDocSwagger = require('express-jsdoc-swagger');

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

const port = process.env.PORT || 5500;

app.use(express.json());
app.use('/recipes', recipesRoute);
app.use('/lists', listsRoute);
app.use('/admins', adminsRoute);
app.use('/subscriptions', subscriptionsRoute);
app.use('/favorites', favoritesRoute);
app.use('/users', usersRoute);

const options = {
  info: {
    version: '1.0.0',
    title: 'Weekleat API',
    description: 'Back-end for the Weekleat app',
  },
  security: {
    "auth-token": {
      type: 'http',
      scheme: 'bearer',
    },
  },
  servers: [
    {
      url: 'https://weekleat-api.herokuapp.com',
      description: 'The production API server',
    },
    {
      url: 'http://localhost:5500',
      description: 'The developement API server',
    }
  ],
  filesPattern: 'doc/*.js',
  baseDir: __dirname,
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
};
expressJSDocSwagger(app)(options);
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocs));

app.listen(port, console.log('API ready !'));
