/**
 * POST /subscriptions
 * @summary Adds a subscription with Stripe, create a customer if user was not one
 * @tags Subscriptions
 * @security auth-token
 * @param {object} request.body - Payment infos
 * @return {object} 200 - Client secret
 * @return {object} 400 - Invalid token or an error with Stripe
 * @return {object} 403 - Empty token
 * @example response - 200 - example success response
 *  "1g8e9v6XFhTXlvXSqDAT"
 */