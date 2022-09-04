/**
 * DELETE /users
 * @summary Deletes a user and his list/favorites
 * @tags Users
 * @security auth-token
 * @return {object} 200 - Success message
 * @return {object} 400 - Invalid token or network error
 * @return {object} 403 - Empty token
 */