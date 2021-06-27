
var database = require('../config/database.js');
var db = database.getDb();
var config = require('../config/config.js').loadConfigurations();
var _ = require('underscore');

var user = {};
user.getAllUsers = getAllUsers;
user.getUserById = getUserById;
user.getUserByRole = getUsersByRole;
user.addUser = addUser;
user.updateUser = updateUser;
user.deleteUser = deleteUser;
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
function getAllUsers(params) {
    return new Promise((resolve, reject) => {
        db.collection('users').find({}).toArray(function (err, usersList) {
            if (err) {
                reject(err);
                return
            }
            else if (usersList) {
                var response = { status: "success", message: "Users loaded successfully", usersList: usersList }
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
function getUserById(params) {
    return new Promise((resolve, reject) => {
        db.collection('users').findOne({ user_id: params.id }, function (err, userInfo) {
            if (err) {
                reject(err);
                return
            }
            else if (userInfo) {
                var response = { status: "success", message: "User Info loaded successfully", userInfo: userInfo }
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
async function getUsersByRole(params, queryString) {

    var match = {}
    if (params.roleid != 'All') {
        match = { role_id: params.roleid }
    }
    queryString.pageNo = parseInt(queryString.pageNo)
    queryString.maxRows = parseInt(queryString.maxRows)

    var recordsPerPage = queryString.maxRows;
    var skip = recordsPerPage * (queryString.pageNo - 1);
    if (queryString.pageNo == 1) {
        skip = 0;
    }
 

    var getCounts = new Promise((resolve, reject) => {
        db.collection('users').countDocuments(match, function (err, count) {
            if(err){
                reject({ error: err })

            }
            resolve({ totalRecords: count })
        })
    })
    var fetchRecords = new Promise((resolve, reject) => {


        db.collection('users').find(match).skip(skip).limit(recordsPerPage).toArray(function (err, usersList) {
            if (err) {
                reject(err);
                return
            }
            else if (usersList) {
                var response = { status: "success", message: "Roles list loaded successfully", usersList: usersList }
                resolve(response);
            }
        });



    })
    return Promise.all([getCounts, fetchRecords]).then(([getCounts, fetchRecords]) => {
        fetchRecords.totalRecords = getCounts.totalRecords;
        return fetchRecords
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
function addUser(params) {

    return new Promise((resolve, reject) => {
        var random_id = config.genRandomString(32);
        params._id = random_id;
        params.created_at = new Date();
        db.collection('users').insertOne(params, function (err, insertedUser) {
            if (err) {
                reject(err);
                return
            }
            else if (insertedUser) {

                var response = { status: "success", message: "User Added successfully", insertedUser: insertedUser.insertedId }
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
function updateUser(req) {

    return new Promise((resolve, reject) => {


        var userId = req.params.id
        var updateParams = req.body
        db.collection('users').updateOne({ _id: userId }, { $set: updateParams }, function (err, updatedRole) {
            if (err) {
                reject(err);
                return
            }
            else if (updatedRole) {
                var response = { status: "success", message: "User updated successfully", updatedRole: updatedRole }
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
function deleteUser(req) {

    return new Promise((resolve, reject) => {

        var roleId = req.params.id
        var updateParams = req.body
        db.collection('users').deleteOne({ _id: roleId }, function (err, updatedRole) {
            if (err) {
                reject(err);
                return
            }
            else if (updatedRole) {
                var response = { status: "success", message: "User deleted successfully" }
                resolve(response);
            }
        });
    })
}


//readRoles()
function readRolesFromFile() {
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile('./assets/roles.csv');
    var sheetname = workbook.SheetNames[0];
    var csvUploadedFiledetails = workbook.Sheets[sheetname];
    var csvtoJson = XLSX.utils.sheet_to_json(csvUploadedFiledetails, { header: "A" });
    // var isSheetEmpty = _.isEmpty(workbook.Sheets[sheetname])
    // if (isSheetEmpty == true) {
    //    return "The uploaded CSV file is blank. Please upload a CSV file containing data.";
    // }    
    var dups = [];
    var csvSucessUnique = csvtoJson.reduce(function (filtered, option, index) {
        if (_.where(dups, { "A": option.A }).length <= 0 && index != 0) {
            dups.push(option)
            var objectToStore = { _id: option.A, name: option.B, created_at: ExcelDateToJSDate(option.C) }
            filtered.push(objectToStore);
        }
        return filtered;
    }, []);


    db.collection('roles').insertMany(csvSucessUnique, (err, result) => {
        
        console.log("result", result)
    });
}
function ExcelDateToJSDate(serial) {
    let date = new Date(Math.round((serial - 25569) * 864e5));
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;

}
//readUsersFromFile()
function readUsersFromFile() {
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile('./assets/userRoles.csv');
    var sheetname = workbook.SheetNames[0];
    var csvUploadedFiledetails = workbook.Sheets[sheetname];
    var csvtoJson = XLSX.utils.sheet_to_json(csvUploadedFiledetails, { header: "A" });
    // var isSheetEmpty = _.isEmpty(workbook.Sheets[sheetname])
    // if (isSheetEmpty == true) {
    //    return "The uploaded CSV file is blank. Please upload a CSV file containing data.";
    // }    
    try {
        db.createCollection("users",
            {
                validator: {
                    $or:
                        [
                            { user_id: { $type: "string" } },
                            { role_id: { $type: "string" } },
                            { fname: { $type: "string" } },
                            { created_at: { $type: "string" } }
                        ]
                }
            }, function (err, updatedRole) {
                console.log("err",err)
            });
    } catch (exception) {
        console.log("exception", exception)
    }
    var dups = [];
    var csvSucessUnique = csvtoJson.reduce(function (filtered, option, index) {
        if (_.where(dups, { "A": option.A }).length <= 0 && index != 0) {
            dups.push(option)
            var objectToStore = { _id: option.A, user_id: option.B, role_id: option.C, created_at: ExcelDateToJSDate(option.D), fname: option.E, lname: option.F }
            filtered.push(objectToStore);
        }
        return filtered;
    }, []);


    db.collection('users').insertMany(csvSucessUnique, (err, result) => {
        console.log("result", result)
    });
}