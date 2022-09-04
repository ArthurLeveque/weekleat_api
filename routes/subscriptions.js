const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const {getAuth} = require("firebase-admin/auth");
const db = admin.firestore();
const Stripe = require('stripe');
const stripe = Stripe(process.env.stripePrivateKey, {apiVersion: "2022-08-01"})

// Adds a subscription
router.post('/', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      // Check if there is a customer with a corresponding mail
      const email = decodedToken.email;
      await stripe.customers.list({
        email: email,
        limit: 1
      })
      .then(async (customer) => {
        let customerID = "";
        // If there is no customer create it else get the id
        if(customer.data.length === 0) {
          const createdCustomer = await stripe.customers.create({
            payment_method: req.body.payment_method,
            email: email,
            name: req.body.name,
            invoice_settings: {
              default_payment_method: req.body.payment_method
            }
          });
          customerID = createdCustomer.id;
        } else {
          customerID = customer.data[0].id;
        }

        if(customerID !== "") {
          // Create the subscription for the user
          const subscription = await stripe.subscriptions.create({
            customer: customerID,
            items: [{price: "price_1Lb41gJH5h0agO1XgvRIETbn"}],
            expand: ['latest_invoice.payment_intent'],
          });

          const clientSecret = subscription.latest_invoice.payment_intent.client_secret;
          // Send the client secret to finalise the payment
          res.json({"clientSecret": clientSecret});
        } else {
          res.status(400).send("An error has occured")
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send('A problem occured with Stripe.')
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send('Your token is invalid.')
    }); 
  }
});

// Checks if the connected user is subscribed
router.get('/isSubscribed', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async (decodedToken) => {
      // Check if there is a customer with a corresponding mail
      const email = decodedToken.email;
      await stripe.customers.list({
        email: email,
        limit: 1
      })
      .then(async (customer) => {
        let customerID = "";
        // If there is no customer send false else get the id
        if(customer.data.length === 0) {
          res.status(200).send(false);
        } else {
          customerID = customer.data[0].id;
        }
        if(customerID) {
           // Check if there is any active subscriptions corresponding to the customer ID
          const subscriptions = await stripe.subscriptions.list({
            customer: customerID,
            status: "all"
          });
          // only get active and canceled subscriptions
          const filteredSubscriptions = subscriptions.data.filter(sub => sub.status === 'active' || sub.status === 'canceled');

          // If there is no active subscriptions send false, else send infos
          if(filteredSubscriptions.length === 0) {
            res.status(200).send(false);
          } else {
            res.status(200).send(filteredSubscriptions[0]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send('A problem occured with Stripe.')
      })
    })
    .catch((error) => {
      res.status(400).send('Your token is invalid.')
      console.log(error)
    }); 
  }
});

// Cancels a subscription
router.post('/cancel', async (req, res) => {
  const current_token = req.header('auth-token');
  if(!current_token) {
    res.status(403).send('You need a token to access this route');
  } else {
    getAuth()
    .verifyIdToken(current_token)
    .then(async () => {
      await stripe.subscriptions.del(req.body.subscriptionID)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send("Something went wrong with Stripe");
      })
    })
    .catch((error) => {
      res.status(400).send('Your token is invalid.')
      console.log(error)
    }); 
  }
});

module.exports = router;