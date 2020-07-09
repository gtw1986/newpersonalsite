const middlewareObj = {
    isAdmin(req, res, next) { 
        if(!req.user.isAdmin) {
            //req.flash('error', 'You need to be an administrator to do that.');
            res.redirect('/login');
            
        } else {
            
            next();
        }
    },
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        
        //req.flash('error', 'You need to be logged in to do that');
        res.redirect('/login');
    }
        
}



module.exports = middlewareObj;