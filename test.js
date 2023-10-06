const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-app")
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("unable to connect");
  });

//create
// BlogPost.create({
//   title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
//   body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:"
// });

async function createCourse() {
  const blogPost = new BlogPost({
    title: "Angular Course",
    body: "Mosh",
  });
  // try {
  //   await course.validate();
  const result = await blogPost.save();
  console.log(result);
}
function viewPost(id) {
  const post = BlogPost.find({ _id: id });
  console.log(post);
}

function viewAll() {
  const posts = BlogPost.find();
  console.log(posts);
}

viewAll();

//viewPost("651ea637c6f6e37181ada539");
//createCourse();
