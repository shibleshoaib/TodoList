var dbService = require('../data/dbService');

var GetListItems = function(req, res, callback) {
    let usertypeCookie = req.cookies['usertype'];;
    let userId = usertypeCookie === 'admin' ? 1 : 2;
    //Stored Procedure
    let query = "[GetListItems]" + userId + "";

    //Database Query
    dbService.executeQuery(query, function(data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

var GetListItemsById = function(req, res, callback) {
    let listId = req.params.id;
    //let status = req.query.status;

    //Stored Procedure
    var query = "[GetListItemByID] " + listId + "";

    //Database Query
    dbService.executeQuery(query, function(data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

var postListItem = function(req, res, callback) {
    let listId = 0;
    if (isNaN(parseInt(req.body.listId)))
        listId = 0;
    else
        listId = parseInt(req.body.listId);
    if (req.body.isActive === '!true') { req.body.isActive = false; }
    if (req.body.isActive === '!false') { req.body.isActive = true; }
    //isActive=req.body.isActive===!true?false:true;
    //Stored Procedure
    var query = "[SaveListItem] " + listId + ", '" + req.body.contentName + "', " + req.body.isActive + "";
    console.log(query);

    //Database Query
    dbService.executeQuery(query, function(data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

var DeleteListItemsByID = function(req, res, callback) {
    let listId = req.params.id;

    //Stored Procedure
    var query = "[DeleteListItemByID] " + parseInt(listId) + "";
    console.log(query);
    //Database Query
    dbService.executeQuery(query, function(data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

module.exports = {
    GetListItems,
    GetListItemsById,
    postListItem,
    DeleteListItemsByID
};