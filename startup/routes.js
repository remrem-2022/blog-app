const express = require('express');

const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require('express-session');

const blogPost = require('../routes/blogPost');
const userLogin = require('../routes/userLogin');
const userRegister = require('../routes/userRegister');
const contact = require('../routes/contact');
const about = require('../routes/about');

global.loggedIn = null;

module.exports = function(app) {
    //middleware
    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.use(expressSession({
  secret: 'keyboard cat'
  }))

  app.use('/', userRegister);
  app.use('/users/login', userLogin);
  app.use('/auth/register', userRegister);
  app.use('/contact', contact);

  //set the engine
    app.set("view engine", "ejs");

}