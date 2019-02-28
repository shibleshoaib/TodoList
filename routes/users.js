var express = require('express');
var exphbs = require('express-handlebars');
var router = express.Router();
//let jwt = require('jsonwebtoken');
var passport = require('./passport');
//var passport = require('passport');
//var strategy = require('passport-local');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('users', {});
});

/* Post users Login. */
// router.post('/', function(req, res, next) {
//     let userdata = {
//         username: req.body.username,
//         password: req.body.password
//     };

//     //Go to server for user varificarion
//     if (userdata.username == "shibli" && userdata.password == "12345") {
//         let token = jwt.sign(userdata, global.config.secretKey, {
//             algorithm: global.config.algorithm,
//             expiresIn: '1m'
//         });

//         res.status(200).json({
//             message: 'Login Successful',
//             jwtoken: token
//         });
//     } else {
//         res.status(401).json({
//             message: 'Login Failed'
//         });
//     }
// });
//let users = {};

/* Post users Login. */
router.post('/', function(req, res, next) {
    passport.authenticate('local', function(data, err) {
        if (err) {
            res.redirect('/users?status=' + encodeURIComponent('Error Login!!'));
            console.log(err.name + ':' + err.message);
        } else {
            if (data.user != null) {
                console.log(data.user);
                res.cookie('jwtoken', data.token);
                res.cookie('loggeduser', data.user);
                res.cookie('userName', data.user.userName);
                res.cookie('usertype', data.user.usertype);
                res.cookie('userId', data.user.userId);
                res.redirect('/');
            } else {
                res.redirect('/users?status=' + encodeURIComponent('Incorrect login details!!'));
            }
        }
    })(req, res, next);
});
// GET user Logout
router.get('/logout', function(req, res, next) {
    res.clearCookie('jwtoken');
    res.clearCookie('loggeduser');
    res.clearCookie('userName');
    res.clearCookie('usertype');
    res.redirect('/users');
});

module.exports = router;