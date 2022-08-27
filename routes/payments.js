const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const {getAuth} = require("firebase-admin/auth");
const db = admin.firestore();
const Stripe = require('stripe');
const stripe = Stripe("sk_test_51Lb3zcJH5h0agO1XKcn1DP6zBnflnEFJkvYcdKh7YaVQnEtBFM2pxY1s0w8P6ftLHpLfeVafCmEZCzmgzOtlRf3K00HX0dmQuu", {apiVersion: "2022-08-01"})

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
      res.status(400).send('Your token is invalid.')
      console.log(error)
    }); 
  }
});

module.exports = router;