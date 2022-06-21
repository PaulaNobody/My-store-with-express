const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

function routerApi(app){0
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);0.
}

module.exports = routerApi;





