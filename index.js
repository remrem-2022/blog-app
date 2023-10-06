const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog-app')
  .then(() =>{ console.log('db connected')})
  .catch(() =>{console.log('unable to connect')});

const app = express();

//middleware
app.use(express.static('public'));

//set the engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/post', (req, res) => {
  res.render('post');
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});