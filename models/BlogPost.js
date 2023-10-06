const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// this script will create the schema of the database
const BlogPostSchema = new Schema({
  title: String,
  body: String,
});

console.log("HIIII WALA KAY LAMI");

console.log("hello han mas wala kay lamio");

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
