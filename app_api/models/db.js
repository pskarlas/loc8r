// Define Database connection string and use it to open Mongoose connection.
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/Loc8r';
var gracefulShutdown;
require('./locations.js');

//Listen for Mongoose connection events and output status in the console
mongoose.connect(dbURI);
mongoose.connection.on('connected', function(){
  console.log('Mongoose connected on ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error ' + err );
});
mongoose.connection.on('disconnect', function() {
  console.log('Mongoose disconnected');
});

//Reusable function to close Mongoose connection

gracefulShutdown = function(message, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + message);
    callback();
  });
};

//For Nodemon restarts
process.once('SIGUSR2', function(){
  gracefulShutdown('Nodemon Restart', function() {
    process.kill(process.pid, 'SIGUSR2')
  });
});
//For app termination
process.on('SIGINT', function() {
  gracefulShutdown('App termination', function() {
    process.exit(0);
  });
});
//For Heroku App termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});