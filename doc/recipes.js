/**
 * GET /recipes
 * @summary Returns all recipes
 * @tags Recipes
 * @return {object} 200 - A list of recipes
 * @return {object} 400 - Bad request response
 * @example response - 200 - example success response
[
    {
        "id": "1g8e9v6XFhTXlvXSqDAT",
        "data": {
            "isVegan": false,
            "withoutGluten": true,
            "ingredients": [
                {
                    "ingredientName": "Aubergine",
                    "quantity": "1",
                    "key": 0,
                    "mesurement": "unit"
                },
                {
                    "ingredientName": "Sauce bolognaise",
                    "quantity": "20",
                    "key": 1,
                    "mesurement": "cl"
                },
                {
                    "mesurement": "gr",
                    "quantity": "75",
                    "ingredientName": "Parmesan râpé",
                    "key": 2
                }
            ],
            "isVegetarian": true,
            "image": {
                "imageName": "1661179125881-53e8088d1247a8",
                "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661179125881-53e8088d1247a8?alt=media&token=15fa91f0-5a9c-43c8-8c97-dda61b3d3b72"
            },
            "steps": "Couper les aubergines en tranches assez fines.\nLes faire dégorger 30 min (les saupoudrer de sel).\nDans une poêle, faire chauffer de l'huile d'olive et y dorer les tranches d'aubergines de chaque côté.\nBaisser le feu et laisser les aubergines s'attendrir.\nDans un plat allant au four, étaler la sauce bolognaise sur le fond, saupoudrer de parmesan et étaler une couche d'aubergine.\nRecommencer l'opération autant de fois que nécessaire, terminer par la sauce bolognaise.\nRecouvrir de parmesan et parsemer de beurre.\nMettre à four chaud pendant environ 30 min.",
            "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
            "name": "Aubergine à la parmesane"
        }
    },
    {
        "id": "2SQliMFeONICly5tNmE8",
        "data": {
            "isVegan": false,
            "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
            "isVegetarian": true,
            "ingredients": [
                {
                    "mesurement": "unit",
                    "ingredientName": "Citron",
                    "key": 0,
                    "quantity": "1"
                },
                {
                    "key": 1,
                    "mesurement": "cl",
                    "quantity": "7.5",
                    "ingredientName": "Huile d'olive"
                },
                {
                    "key": 2,
                    "quantity": "150",
                    "mesurement": "gr",
                    "ingredientName": "Parmesan"
                },
                {
                    "mesurement": "gr",
                    "ingredientName": "Spaghettis",
                    "quantity": "250",
                    "key": 3
                }
            ],
            "steps": "Faites cuire les pâtes comme indiqué sur le paquet dans une grande quantité d'eau bouillante salée.\nPendant ce temps, prélevez finement le zeste d'un demi-citron et pressez le jus de 4 dans un saladier.\nAjoutez le verre d'huile d'olive, le zeste finement haché et le parmesan. Mélangez au fouet de façon à obtenir une consistance crémeuse. Salez légèrement et saupoudrez de poivre concassé.\nVersez les pâtes cuites al dente dans un saladier (préalablement chauffé) et mélangez intimement avec la sauce. Servez aussitôt.",
            "withoutGluten": false,
            "name": "Pasta al lemone",
            "image": {
                "imageName": "1661191803862-68dad69479819",
                "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661191803862-68dad69479819?alt=media&token=ee73cd03-1f50-4de3-a07c-865bfa647ad4"
            }
        }
    }
  ]
 */

/**
 * GET /recipes/random
 * @summary Returns a random recipe
 * @tags Recipes
 * @security auth-token
 * @return {object} 200 - A random recipe
 * @return {object} 400 - Invalid token
 * @return {object} 403 - Empty token
 * @example response - 200 - example success response
    {
      "id": "1g8e9v6XFhTXlvXSqDAT",
      "data": {
          "isVegan": false,
          "withoutGluten": true,
          "ingredients": [
              {
                  "ingredientName": "Aubergine",
                  "quantity": "1",
                  "key": 0,
                  "mesurement": "unit"
              },
              {
                  "ingredientName": "Sauce bolognaise",
                  "quantity": "20",
                  "key": 1,
                  "mesurement": "cl"
              },
              {
                  "mesurement": "gr",
                  "quantity": "75",
                  "ingredientName": "Parmesan râpé",
                  "key": 2
              }
          ],
          "isVegetarian": true,
          "image": {
              "imageName": "1661179125881-53e8088d1247a8",
              "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661179125881-53e8088d1247a8?alt=media&token=15fa91f0-5a9c-43c8-8c97-dda61b3d3b72"
          },
          "steps": "Couper les aubergines en tranches assez fines.\nLes faire dégorger 30 min (les saupoudrer de sel).\nDans une poêle, faire chauffer de l'huile d'olive et y dorer les tranches d'aubergines de chaque côté.\nBaisser le feu et laisser les aubergines s'attendrir.\nDans un plat allant au four, étaler la sauce bolognaise sur le fond, saupoudrer de parmesan et étaler une couche d'aubergine.\nRecommencer l'opération autant de fois que nécessaire, terminer par la sauce bolognaise.\nRecouvrir de parmesan et parsemer de beurre.\nMettre à four chaud pendant environ 30 min.",
          "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
          "name": "Aubergine à la parmesane"
      }
    }
 */

/**
 * GET /recipes/{id}
 * @summary Returns a specific recipe
 * @tags Recipes
 * @param {string} id.path - Recipe ID
 * @return {object} 200 - A recipe
 * @return {object} 400 - Invalid id
 * @example response - 200 - example success response
    {
      "id": "1g8e9v6XFhTXlvXSqDAT",
      "data": {
          "isVegan": false,
          "withoutGluten": true,
          "ingredients": [
              {
                  "ingredientName": "Aubergine",
                  "quantity": "1",
                  "key": 0,
                  "mesurement": "unit"
              },
              {
                  "ingredientName": "Sauce bolognaise",
                  "quantity": "20",
                  "key": 1,
                  "mesurement": "cl"
              },
              {
                  "mesurement": "gr",
                  "quantity": "75",
                  "ingredientName": "Parmesan râpé",
                  "key": 2
              }
          ],
          "isVegetarian": true,
          "image": {
              "imageName": "1661179125881-53e8088d1247a8",
              "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661179125881-53e8088d1247a8?alt=media&token=15fa91f0-5a9c-43c8-8c97-dda61b3d3b72"
          },
          "steps": "Couper les aubergines en tranches assez fines.\nLes faire dégorger 30 min (les saupoudrer de sel).\nDans une poêle, faire chauffer de l'huile d'olive et y dorer les tranches d'aubergines de chaque côté.\nBaisser le feu et laisser les aubergines s'attendrir.\nDans un plat allant au four, étaler la sauce bolognaise sur le fond, saupoudrer de parmesan et étaler une couche d'aubergine.\nRecommencer l'opération autant de fois que nécessaire, terminer par la sauce bolognaise.\nRecouvrir de parmesan et parsemer de beurre.\nMettre à four chaud pendant environ 30 min.",
          "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
          "name": "Aubergine à la parmesane"
      }
    }
*/

/**
 * GET /recipes/user/{id}
 * @summary Returns all recipes from a user
 * @tags Recipes
 * @param {string} id.path - User ID
 * @return {object} 200 - A recipe
 * @return {object} 400 - Invalid id
 * @example response - 200 - example success response
   [
    {
        "id": "1g8e9v6XFhTXlvXSqDAT",
        "data": {
            "isVegan": false,
            "withoutGluten": true,
            "ingredients": [
                {
                    "ingredientName": "Aubergine",
                    "quantity": "1",
                    "key": 0,
                    "mesurement": "unit"
                },
                {
                    "ingredientName": "Sauce bolognaise",
                    "quantity": "20",
                    "key": 1,
                    "mesurement": "cl"
                },
                {
                    "mesurement": "gr",
                    "quantity": "75",
                    "ingredientName": "Parmesan râpé",
                    "key": 2
                }
            ],
            "isVegetarian": true,
            "image": {
                "imageName": "1661179125881-53e8088d1247a8",
                "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661179125881-53e8088d1247a8?alt=media&token=15fa91f0-5a9c-43c8-8c97-dda61b3d3b72"
            },
            "steps": "Couper les aubergines en tranches assez fines.\nLes faire dégorger 30 min (les saupoudrer de sel).\nDans une poêle, faire chauffer de l'huile d'olive et y dorer les tranches d'aubergines de chaque côté.\nBaisser le feu et laisser les aubergines s'attendrir.\nDans un plat allant au four, étaler la sauce bolognaise sur le fond, saupoudrer de parmesan et étaler une couche d'aubergine.\nRecommencer l'opération autant de fois que nécessaire, terminer par la sauce bolognaise.\nRecouvrir de parmesan et parsemer de beurre.\nMettre à four chaud pendant environ 30 min.",
            "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
            "name": "Aubergine à la parmesane"
        }
    },
    {
        "id": "2SQliMFeONICly5tNmE8",
        "data": {
            "isVegan": false,
            "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
            "isVegetarian": true,
            "ingredients": [
                {
                    "mesurement": "unit",
                    "ingredientName": "Citron",
                    "key": 0,
                    "quantity": "1"
                },
                {
                    "key": 1,
                    "mesurement": "cl",
                    "quantity": "7.5",
                    "ingredientName": "Huile d'olive"
                },
                {
                    "key": 2,
                    "quantity": "150",
                    "mesurement": "gr",
                    "ingredientName": "Parmesan"
                },
                {
                    "mesurement": "gr",
                    "ingredientName": "Spaghettis",
                    "quantity": "250",
                    "key": 3
                }
            ],
            "steps": "Faites cuire les pâtes comme indiqué sur le paquet dans une grande quantité d'eau bouillante salée.\nPendant ce temps, prélevez finement le zeste d'un demi-citron et pressez le jus de 4 dans un saladier.\nAjoutez le verre d'huile d'olive, le zeste finement haché et le parmesan. Mélangez au fouet de façon à obtenir une consistance crémeuse. Salez légèrement et saupoudrez de poivre concassé.\nVersez les pâtes cuites al dente dans un saladier (préalablement chauffé) et mélangez intimement avec la sauce. Servez aussitôt.",
            "withoutGluten": false,
            "name": "Pasta al lemone",
            "image": {
                "imageName": "1661191803862-68dad69479819",
                "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661191803862-68dad69479819?alt=media&token=ee73cd03-1f50-4de3-a07c-865bfa647ad4"
            }
        }
    }
  ]
 */

  /**
 * POST /recipes
 * @summary Adds a recipe
 * @tags Recipes
 * @security auth-token
 * @param {object} request.body - Recipe
 * @return {object} 200 - The created recipe ID
 * @return {object} 400 - Invalid token
 * @return {object} 403 - Empty token
 * @example request - example payload
 * {
    "image": {
        "imageName": "1661179125881-53e8088d1247a8",
        "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661179125881-53e8088d1247a8?alt=media&token=15fa91f0-5a9c-43c8-8c97-dda61b3d3b72"
    },
    "ingredients": [
        {
            "key": 0,
            "quantity": "1",
            "mesurement": "unit",
            "ingredientName": "Aubergine"
        },
        {
            "mesurement": "cl",
            "ingredientName": "Sauce bolognaise",
            "key": 1,
            "quantity": "20"
        },
        {
            "key": 2,
            "ingredientName": "Parmesan râpé",
            "mesurement": "gr",
            "quantity": "75"
        }
    ],
    "isVegan": false,
    "withoutGluten": true,
    "name": "Aubergine à la parmesane",
    "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
    "isVegetarian": true,
    "steps": "Couper les aubergines en tranches assez fines.\nLes faire dégorger 30 min (les saupoudrer de sel).\nDans une poêle, faire chauffer de l'huile d'olive et y dorer les tranches d'aubergines de chaque côté.\nBaisser le feu et laisser les aubergines s'attendrir.\nDans un plat allant au four, étaler la sauce bolognaise sur le fond, saupoudrer de parmesan et étaler une couche d'aubergine.\nRecommencer l'opération autant de fois que nécessaire, terminer par la sauce bolognaise.\nRecouvrir de parmesan et parsemer de beurre.\nMettre à four chaud pendant environ 30 min."
  }
 * @example response - 200 - example success response
 *  "1g8e9v6XFhTXlvXSqDAT"
 */

  /**
 * PUT /recipes/{id}
 * @summary Edits a recipe
 * @tags Recipes
 * @security auth-token
 * @param {string} id.path - Recipe ID
 * @param {object} request.body - Recipe
 * @return {object} 200 - Success message
 * @return {object} 400 - Invalid token
 * @return {object} 403 - Empty token
 * @example request - example payload
 * {
    "image": {
        "imageName": "1661179125881-53e8088d1247a8",
        "imageURL": "https://firebasestorage.googleapis.com/v0/b/weekleat.appspot.com/o/1661179125881-53e8088d1247a8?alt=media&token=15fa91f0-5a9c-43c8-8c97-dda61b3d3b72"
    },
    "ingredients": [
        {
            "key": 0,
            "quantity": "1",
            "mesurement": "unit",
            "ingredientName": "Aubergine"
        },
        {
            "mesurement": "cl",
            "ingredientName": "Sauce bolognaise",
            "key": 1,
            "quantity": "20"
        },
        {
            "key": 2,
            "ingredientName": "Parmesan râpé",
            "mesurement": "gr",
            "quantity": "75"
        }
    ],
    "isVegan": false,
    "withoutGluten": true,
    "name": "Aubergine à la parmesane",
    "authorID": "jfnxL0VI9JRL1Ay2lgn1EzoWjsG2",
    "isVegetarian": true,
    "steps": "Couper les aubergines en tranches assez fines.\nLes faire dégorger 30 min (les saupoudrer de sel).\nDans une poêle, faire chauffer de l'huile d'olive et y dorer les tranches d'aubergines de chaque côté.\nBaisser le feu et laisser les aubergines s'attendrir.\nDans un plat allant au four, étaler la sauce bolognaise sur le fond, saupoudrer de parmesan et étaler une couche d'aubergine.\nRecommencer l'opération autant de fois que nécessaire, terminer par la sauce bolognaise.\nRecouvrir de parmesan et parsemer de beurre.\nMettre à four chaud pendant environ 30 min."
  }
 */

/**
 * DELETE /recipes/{id}
 * @summary Deletes a recipe
 * @tags Recipes
 * @security auth-token
 * @param {string} id.path - Recipe ID
 * @return {object} 200 - Success message
 * @return {object} 400 - Invalid token or wrong ID
 * @return {object} 403 - Empty token
 */