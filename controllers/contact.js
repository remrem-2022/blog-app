module.exports = (req, res) =>{
    if(req.session.userId){
        return res.render("contact");
    }
    res.redirect('/home')
}