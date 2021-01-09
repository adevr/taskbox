const ERRORS = require("../config/errors")

module.exports = {
    registerValidator: (req, res, next) => {
        let {email, fullname, password} = req.body
        if ((email == null || email === '' || email === undefined)
            || (fullname == null || fullname === '' || fullname === undefined)
            || (password == null || password === '' || password === undefined)) {
            res.render("register", ERRORS.INVALID_INPUT)
            next();
        }
        next();
    },

    loginValidator: (req, res, next) => {
        let {email, password} = req.body;
        if ((email == null || email === '' || email === undefined)
            || (password == null || password === '' || password === undefined)) {
            res.render("login", ERRORS.INVALID_CREDENTIALS)
            next()
        }
        next();
    },

    activationValidator: (req, res, next) => {
        let {userId} = req.params;
        if (userId === null || userId === 0 || userId === undefined) {
            res.render("/login")
            next()
        }
        next();
    },

    newTaskValidator: (req, res, next) => {
        let {title} = req.body
        if ((title == null || title === '' || title === undefined)) {
            res.send(ERRORS.INVALID_INPUT)
            next()
        }
        next()
    },
    editProfileValidator: (req, res, next) => {
        let {fullname, email, password, confirmpassword} = req.body

        if ((fullname == null || fullname === '' || fullname === undefined) || (email == null || email === '' || email === undefined)) {
            next()
        }

        if(password !== confirmpassword && password === ""){
            req.body.password = null
            next()
        }
        next()
    }
}