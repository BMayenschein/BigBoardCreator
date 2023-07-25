module.exports = {
    displayPage: (req,res)=>{
        res.render('home.ejs',  {user: req.user})
    }
}