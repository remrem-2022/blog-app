module.exports = (req, res) =>{
    if(req.session.userId){
        return res.render("about");
    }
    res.redirect('/home')
}