var createError = require('http-errors');
var express = require('express');
var cors = require('cors')

var path = require('path');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('etag', false);
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

var config = require('./config/config.js').loadConfigurations();

var mongodbutil = require( './config/database');
mongodbutil.connectToServer( function( err ) {

  if(err)
  return "Failed to connect to database"
  //app goes online once this callback occurs
  var usersRouter = require('./controllers/user.controller');
  var rolesRouter = require('./controllers/roles.controller');

 // app.use('/', indexRouter);
  app.use('/user', usersRouter);
  app.use('/roles', rolesRouter);

  // // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    res.status(404);
    next(createError(404));
  });


  // app.get('*', (req, res) => {
  //   res.render('404', {
  //     title: '404',
  //     name: 'test',
  //     errorMessage: 'Page not found.'
  //   })
  // })


  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error.html');
  });
  //end of calback
});
var allowlist = [config.clientApiUrl, 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))
app.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`)
})


process.on('unhandledException', (err) => {
   console.error("unhandledException",err) 
    process.exit(1)
});
process.on('uncaughtException', (err) => {
  console.error("uncaughtException",err)
 
    process.exit(1)
});