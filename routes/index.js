var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let userNameCookie = req.cookies['userName'];
    let usertypeCookie = req.cookies['usertype'];

    res.render('index', { title: 'Welcome to To DO List App', userName: userNameCookie, usertype: usertypeCookie });
});

module.exports = router;