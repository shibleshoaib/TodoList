var passport = require('passport');
var strategy = require('passport-local').Strategy;
var dbService = require('../data/dbService');
let jwt = require('jsonwebtoken');
//passport.use(passport.initialize());
passport.use(new strategy({ session: false }, function(username, password, callback) {
    //Stored Procedure
    var query = "[GetUserAuthentication] '" + username + "', '" + password + "'";
    //console.log(query);
    //Get Data From Database
    dbService.executeQuery(query, function(data, err) {
        if (err) {
            callback(null, err);
        } else {
            var result = data.recordset
            if (result.length > 0) {
                let token = jwt.sign(result[0], global.config.secretKey, {
                    algorithm: global.config.algorithm,
                    /* expiresIn: '1m' */
                });
                callback({ user: result[0], token: token });
            } else {
                callback({ user: null, token: null });
            }
        }
    });
}));


module.exports = passport;