


var rolesService = require('../services/roles.service');


var express = require('express');
var router = express.Router();


/**
 * List of all the route available in this module and respective function linked to it
 */
router.get('/', getRoles);
router.get('/:id', getRoleById)
router.post('/', addRole);
router.put('/:id', updateRole)
router.delete('/:id', deleteRole)



module.exports = router;


function getRoles(req, res) {
    try {
        rolesService.getRoles(req.body)
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

function getRoleById(req, res) {
    try {
        rolesService.getRoleById(req.params)
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
function addRole(req, res) {
    try {
        if(req.body.name){
        rolesService.addRole(req.body)
            .then(function (response) {
                if (response) {
                    res.send(response);
                } else {
                    res.send({ status: "Failure", message: "Failed to fetch roles.Please try again." });
                }
            });
        }else{
            res.send({ status: "Failure", message: "Required params are missing" });

        }
    } catch (err) {
        res.send({ status: "failure", message: 'Something went wrong.' });
    }
}


function updateRole(req, res) {
    try {
       

        rolesService.updateRole(req)
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

function deleteRole(req, res) {
    try {
       

        rolesService.deleteRole(req)
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

