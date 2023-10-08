const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const BlogPost = require("../models/BlogPost");


router.get("/", async (req, res) => {
  let username = '';
if (req.session && req.session.username) {
  username = req.session.username;
}
  const blogposts = await BlogPost.find().populate('userid');
  res.render("index", { blogposts });
});


router.post('/create', async (req, res) => {
  // Assuming you've already authenticated the user and stored their ID in req.session.userId
  const { title, body } = req.body;

  try {
    // Create a new BlogPost and set the userId based on req.session.userId
    const newBlogPost = new BlogPost({
      title,
      body,
      userId: req.session.userId, // Get the userId from the session
    });

    await newBlogPost.save();
    res.redirect('/'); // Redirect to the homepage or wherever you want
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/post/:id', async (req, res) => {
    try {
      const blogpostId = req.params.id;
      const blogpost = await BlogPost.findById(blogpostId);
  
      if (!blogpost) {
        return res.status(404).send('Blog post not found');
      }
  
      res.render('post', { blogpost });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.post("/posts/store", authMiddleware, async (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name));
    await BlogPost.create({ ...req.body, image: "/img/" + image.name });
    res.redirect("/");
  });


router.put('/:id', async (req, res) => {

    const blog = await BlogPost.findByIdAndUpdate(req.params.id, { title: req.body.title},{
        new: true
    });

    if(!blog) res.status(404).send('The blog with the given id was not found.');

    res.send(blog);
});

exports = router;