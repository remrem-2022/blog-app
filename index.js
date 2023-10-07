const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const BlogPost = require("./models/BlogPost");

//contoller
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-app")
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("unable to connect");
  });

const app = express();

//middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//set the engine
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find();
  res.render("index", { blogposts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", { blogpost });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name));
  await BlogPost.create({ ...req.body, image: "/img/" + image.name });
  res.redirect("/");
});

app.get("/auth/register", (req, res) => {
  res.render("register");
});

app.post("/users/register", storeUserController);

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController)




//to do
//create a search function
//validation
//contoller refactor to mvc
//could save ideltical username

//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
