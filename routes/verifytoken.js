var express = require('express');
var router = express.Router();
var dbService = require('../data/dbService');
var jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
    var token = req.headers['x-access-token'] || req.cookies.jwtoken;
    var httpMethod = null; //var httpMethod = req.method;
    var originalUrl = req.originalUrl;

    if (originalUrl.includes("save")) httpMethod = 'POST';
    else if (originalUrl.includes("edit")) httpMethod = 'PUT';
    else if (originalUrl.includes("delete")) httpMethod = 'DELETE';
    else httpMethod = 'GET';

    if (token) {
        jwt.verify(token, global.config.secretKey, {
            algorithm: global.config.algorithm

        }, function(err, decoded) {
            if (err) {
                let errordata = {
                    message: err.message,
                    expiredAt: err.expiredAt
                };
                console.log(errordata);
                return res.render('customers', { title: 'Unauthorized Access', status: 'Token Expired at ' + err.expiredAt });
            }
            req.decoded = decoded;

            //Stored Procedure
            var query = "[GetUserAuthorization] '" + decoded.userId + "', '" + httpMethod + "'";

            //Get Authorization From Database
            dbService.executeQuery(query, function(data, err) {
                if (err) {
                    console.log(err.name + ':' + err.message);
                } else {
                    var result = data.recordset[0].permission;
                    if (result == 'true') {
                        next();
                    } else {
                        console.log('Unauthorized Access!!');
                        if (httpMethod == 'GET') {
                            return res.redirect('/');
                        } else {
                            return res.redirect('/listItems?status=' + encodeURIComponent('Operation Restricted!!'));
                        }
                    }
                }
            });
        });
    } else {
        return res.redirect('/');
    }
});

module.exports = router;