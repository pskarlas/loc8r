//Set up Mongoose and Model
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
// Simplify JSON response
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.locationsListByDistance = function(req,res) {
  var lng = parseFloat(req.guery.lng);
  var lat = parseFloat(req.query.lat);
  var point = {
    type: "point",
    coordinate: [lng, lat]
  };
  Loc.geoNear(point, options, callback);
};
module.exports.locationsCreate = function(req,res) {
  sendJsonResponse(res, 200, {"status":"success"});
};
module.exports.locationsReadOne = function(req,res) {
  if (req.params && req.params.locationid) {
    Loc
    .findById(req.params.locationid)
    .exec(function(err, location) {
      if (!location) {
        sendJsonResponse(res, 404,{"message":"Location ID not found"});
        return;
      } else if (err) {
        sendJsonResponse(res,404, err);
        return;
      }
      sendJsonResponse(res, 200, location);
    });

  } else {
    sendJsonResponse(res, 404, {"message":"Please specify a location id" });
  }
  
};
module.exports.locationsUpdateOne = function(req,res) {};
module.exports.locationsDeleteOne = function(req,res) {};
