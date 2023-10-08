module.exports = (req, res) => {
  if (req.session.id) {
    return res.render("create");
  }
  res.redirect("/auth/login");
};
