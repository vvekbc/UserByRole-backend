/**
 * @datbase.js
 * This config page is used to declare database configuration
 *
 */

 var MongoClient = require( 'mongodb' ).MongoClient;
 var _db;
 module.exports = {
   connectToServer: function( callback ) {
     MongoClient.connect( "mongodb://localhost:27017",{ useUnifiedTopology: true }, function( err, client ) {
       _db = client.db("fnet_roles");
       console.log("Connected to DB!!")
       return callback( err );
     } );
   },
   getDb: function() {
     return _db;
   }
 };