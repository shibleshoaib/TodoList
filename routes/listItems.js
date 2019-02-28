var express = require('express');
var router = express.Router();
var dbService = require('../data/dbService');
var listService = require('../data/listService');
let verifyToken = require('./verifytoken');

/* GET customers listing. */
router.get('/listItems', verifyToken, function(req, res, next) {
    let status = req.query.status;

    //Service Call
    listService.GetListItems(req, res, function(data, err) {
        if (err) {
            res.render('listItems', { message: 'Error Loading Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            res.render('listItems', { listdata: data.recordset, message: status });
        }
    });

});



/* GET customers ByID */
router.get('/listItems/edit/:id', verifyToken, function(req, res, next) {
    let status = req.query.status;

    listService.GetListItemsById(req, res, function(data, err) {
        if (err) {
            res.render('listItems', { message: 'Error Binding Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            var listItemedit = data.recordset[0];

            //Service Call
            listService.GetListItems(req, res, function(data, err) {
                if (err) {
                    res.render('listItems', { message: 'Error Loading Data!!' });
                    console.log(err.name + ':' + err.message);
                } else {
                    res.render('listItems', { listdata: data.recordset, list: listItemedit, message: status });
                }
            });
        }
    });
});

/* POST customer */
router.post('/listItems/save', verifyToken, function(req, res, next) {
    let status = req.query.status;

    //Service Call
    listService.postListItem(req, res, function(data, err) {
        if (err) {
            res.render('listItems', { message: 'Error Saving Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            res.redirect('/listItems');
        }
    });
});

/* DELETE Delete customers */
router.get("/listItems/delete/:id", verifyToken, function(req, res) {
    let status = req.query.status;

    //Service Call
    listService.DeleteListItemsByID(req, res, function(data, err) {
        if (err) {
            res.render('listItems', { message: 'Error Deleting Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            res.redirect('/listItems');
        }
    });
});

module.exports = router;