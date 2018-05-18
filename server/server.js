"use strict";
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const app = express();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');

// Set environment
app.set('env', process.env['APP_ENV'] || 'development')

// View engine setup (HTML views)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// HTTP Request logging (disabled in test mode)
if (app.settings.env !== 'test') {
  const loggerType = app.settings.env == 'production' ? 'common' : 'dev'
  app.use(logger(loggerType))
}

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Enabling CORS
// More info: https://github.com/expressjs/cors
let corsOptions = {}
if (app.settings.env === 'production') {
  // Configuration in production mode should be per domain!
  const corsWhitelist = ['http://example1.com', 'https://example2.com']
  corsOptions = {
    origin: (origin, callback) => {
      if (corsWhitelist.indexOf(origin) !== -1) callback(null, true)
      else callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(bodyParser.json())

// Serve static content from /public
app.use(express.static(path.join(__dirname, 'public')))

// Mount all resource routes
app.use("/api", usersRoutes(knex));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

console.log(`Running in ${app.settings.env} mode.`)

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

module.exports = app

