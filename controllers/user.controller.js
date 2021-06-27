

/**
 * Loading in-house entity based organised modules to reuse the functionality
 */
var userService = require('../services/user.service');

/**
 * Loading external libraries used
 */
var express = require('express');
var router = express.Router();


/**
 * List of all the route available in this module and respective function linked to it
 */

 router.get('/', getAllUsers);
 router.get('/:id', getUserById)
 router.get('/roles/:roleid', getUserByRole);
 router.post('/', addUser)
 router.put('/:id', updateUser)
 router.delete('/:id', deleteUser)
 module.exports = router;



function getAllUsers(req, res) {
    try {
        userService.getAllUsers()
            .then(function (response) {
                if (response) {
                    res.send(response);
                } else {
                    res.send({ status: "Failure", message: "Failed to fetch roles.Please try again." });
                }
            });
    } catch (err) {
        res.send({ status: "failure", message: 'Something went wrong.' });
    }
}

function getUserById(req, res) {
    try {
        userService.getUserById(req.params)
            .then(function (response) {
                if (response) {
                    res.send(response);
                } else {
                    res.send({ status: "Failure", message: "Failed to register Please try again." });
                }
            });
    } catch (err) {
        res.send({ status: "failure", message: 'Something went wrong.' });
    }
}
function getUserByRole(req, res) {
    try {
        userService.getUserByRole(req.params,req.query)
            .then(function (response) {
                if (response) {
                    res.send(response);
                } else {
                    res.send({ status: "Failure", message: "Failed to fetch roles.Please try again." });
                }
            });
    } catch (err) {
        res.send({ status: "failure", message: 'Something went wrong.' });
    }
}


function addUser(req, res) {
    try {
       

        userService.addUser(req.body)
            .then(function (response) {
                if (response) {
                    res.send(response);
                } else {
                    res.send({ status: "Failure", message: "Failed to fetch roles.Please try again." });
                }
            });
    } catch (err) {
        res.send({ status: "failure", message: 'Something went wrong.' });
    }
}

function updateUser(req, res) {
    try {       

        userService.updateUser(req)
            .then(function (response) {
                if (response) {
                    res.send({ status: response.status, message: response.message, response: response.rolesList });
                } else {
                    res.send({ status: "Failure", message: "Failed to fetch roles.Please try again." });
                }
            });
    } catch (err) {
        res.send({ status: "failure", message: 'Something went wrong.' });
    }
}
function deleteUser(req, res) {
    try {
       

        userService.deleteUser(req)
            .then(function (response) {
                if (response) {
                    res.send(response);
                } else {
                    res.send({ status: "Failure", message: "Failed to fetch roles.Please try again." });
                }
            });
    } catch (err) {
        res.send({ status: "failure", message: 'Something went wrong.' });
    }
}