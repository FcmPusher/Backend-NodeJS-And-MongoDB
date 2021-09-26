const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const organizationRoute = require('./organization.route');
const productRoute = require('./product.route');
const fcmtokenRoute = require('./fcmtoken.route');
const fragmentRoute = require('./fragment.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/organization',
    route: organizationRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/fcmtoken',
    route: fcmtokenRoute,
  },
  {
    path: '/fragment',
    route: fragmentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
