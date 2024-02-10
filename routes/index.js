const routes = require('express').Router();

routes.use('/songs', require('./songs'));

module.exports = routes