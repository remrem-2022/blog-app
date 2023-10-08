const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const BlogPost = require("./models/BlogPost");
const expressSession = require("express-session");
global.loggedIn = null;

require('./startup/routes');

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-app")
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("unable to connect");
  });

const app = express();
//contoller
const homeContoller = require("./controllers/homeController");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const newPostController = require("./controllers/newPost");
const getPostController = require("./controllers/post");
const storePostController = require("./controllers/postStore");
const logoutController = require("./controllers/logout");
const contactController = require("./controllers/contact");
const aboutController = require("./controllers/about");

//middleware
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("trust proxy", 1); // trust first proxy
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

//set the engine
app.set("view engine", "ejs");

app.get("/", homeContoller);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, newPostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post("/posts/store", authMiddleware, storePostController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/auth/logout", logoutController);

app.get("/contact", contactController);

app.get("/about", aboutController);

app.use((req, res) => res.render("notfound"));

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