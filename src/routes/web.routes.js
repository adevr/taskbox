const TaskController = require("../controllers/task.controller")
const FrontendController = require("../controllers/frontend.controller")
const UserController = require("../controllers/user.controller")
const asyncRoute = require("../middleware/async.route")
const requestsMiddleware = require("../middleware/requests.middleware")
const {signInChecker} = require("../middleware/redirect.middleware")
const multer = require("multer")
const path = require("path")

var upload = multer({
    dest: path.join(__dirname, "../../public/tmp/files")
});
module.exports = (router) => {
    router.get('/', signInChecker, asyncRoute(FrontendController.index))
    /**
     * login and register routes
     */
    router.get('/login',(req, res) => { res.render('login', {}) })
    router.post('/login', asyncRoute(UserController.login))
    router.post('/register', requestsMiddleware.registerValidator ,asyncRoute(UserController.store))
    router.get('/register', (req, res) => { res.render('register', {}) })
    router.get('/activate/:userId', requestsMiddleware.activationValidator, asyncRoute(UserController.activate))
    router.get('/forgot-password', (req, res) => { res.render('forgotpassword', {}) })
    router.post('/forgot-password', asyncRoute(UserController.forgotPwd))
    router.get('/reset-password/:userId', UserController.viewResetPassword)
    router.post('/reset-password/:userId', asyncRoute(UserController.resetPwd))
    router.get('/logout', signInChecker,UserController.logout)

    /***
     * Tasks routes
     */
    router.get('/daily', signInChecker, asyncRoute(FrontendController.daily))
    //router.get('/weekly', signInChecker, (req, res) => { res.render('weekly', {}) })
    router.post('/new/task', signInChecker, requestsMiddleware.newTaskValidator, asyncRoute(TaskController.store))
    router.post('/update/task/:taskId', signInChecker, asyncRoute(TaskController.update))
    router.post('/delete/task/:taskId', signInChecker, asyncRoute(TaskController.destroy))
    router.post('/task/mark/:taskId', signInChecker, asyncRoute(TaskController.markCompleted))
    /**
     * User routes
     */
    router.get('/profile', signInChecker, asyncRoute(UserController.index))
    router.post('/edit/profile/:userId', upload.single("file"), requestsMiddleware.editProfileValidator, asyncRoute(UserController.update))

    router.get('*', (req,res) => {
        res.render("404");
    })
}

