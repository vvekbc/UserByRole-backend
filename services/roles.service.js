
var database = require('../config/database.js');
var db = database.getDb();
var config = require('../config/config.js').loadConfigurations();
var _ = require('underscore');

var user = {};
user.getRoles = getRoles;
user.getRoleById = getRoleById;
user.addRole = addRole;
user.updateRole = updateRole;
user.deleteRole = deleteRole;
module.exports = user;




/**
*
* Following function is used to fetch all the roles 
*
*
* @getRoles(params)
*
*
*/
function getRoles(params) {
    return new Promise((resolve, reject) => {
        db.collection('roles').find({}).toArray(function (err, rolesList) {
            if (err) {
                reject(err);
                return
            }
            else if (rolesList) {
                var response = { status: "success", message: "Roles list loaded successfully", rolesList: rolesList }
                resolve(response);
            }
        });
    })
}

/**
*
* Following function is used to fetch all the roles 
*
*
* @getRoles(params)
*
*
*/
function getRoleById(params) {
    return new Promise((resolve, reject) => {
        db.collection('roles').findOne({ _id: params.id }, function (err, roleInfo) {
            if (err) {
                reject(err);
                return
            }
            else if (roleInfo) {
                var response = { status: "success", message: "Roles list loaded successfully", roleInfo: roleInfo }
                resolve(response);
            }
        });
    })
}
/**
*
* Following function is used to fetch all the roles 
*
*
* @getRoles(params)
*
*
*/
function addRole(params) {

    return new Promise((resolve, reject) => {
        var random_id =config.genRandomString(32);
        params._id = random_id;
        params.created_at = new Date();
        db.collection('roles').insertOne(params, function (err, insertedRole) {
            if (err) {
                reject(err);
                return
            }
            else if (insertedRole) {
                var response = { status: "success", message: "Roles list loaded successfully", insertedRole: insertedRole.insertedId }
                resolve(response);
            }
        });
    })
}



/**
*
* Following function is used to fetch all the roles 
*
*
* @getRoles(params)
*
*
*/
function updateRole(req) {

    return new Promise((resolve, reject) => {


        var roleId = req.params.id
        var updateParams = req.body
        db.collection('roles').updateOne({ _id: roleId }, { $set: { "name": updateParams.name } }, function (err, updatedRole) {
            if (err) {
                reject(err);
                return
            }
            else if (updatedRole) {
                var response = { status: "success", message: "Roles list loaded successfully", updatedRole: updatedRole }
                resolve(response);
            }
        });
    })
}

/**
*
* Following function is used to fetch all the roles 
*
*
* @getRoles(params)
*
*
*/
function deleteRole(req) {

    return new Promise((resolve, reject) => {

        var roleId = req.params.id
        var updateParams = req.body
        db.collection('roles').deleteOne({ _id: roleId }, function (err, updatedRole) {
            if (err) {
                reject(err);
                return
            }
            else if (updatedRole) {
                var response = { status: "success", message: "Roles list loaded successfully", updatedRole: updatedRole }
                resolve(response);
            }
        });
    })
}

