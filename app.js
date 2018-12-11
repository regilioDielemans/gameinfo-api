const mongoose = require('mongoose');
const assert = ('assert');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


const app = express();

//fixes deprecated notice
mongoose.Promise = global.Promise;


//connects to local or remote db depending on envrionment variable

    console.log('online dbs');
    mongoose.connect('mongodb+srv://admin:YpxiloigMLrUHAo8@cluster0-fxxlz.azure.mongodb.net/test?retryWrites=true');
    
  
  //uses bodyparser middleware to turn body into something more easily usable
  app.use(bodyParser.json());

  //passes app to routes function
  routes(app);


  
  //handles possible errors from the request handlers
  //TODO: handle different types of error codes
  app.use((err, req, res, next) => {
    res.send({ error: err.message });
  });


  module.exports = app;