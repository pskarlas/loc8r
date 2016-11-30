//Set up Mongoose and Model
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
// Simplify JSON response
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.reviewsCreate = function(req,res) {};
module.exports.reviewsReadOne= function(req,res) {
  console.log("Getting single review");
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location) {
          console.log(location);
          var response, review;
            if (!location) {
              sendJsonResponse(res, 404, {"message": "Location ID not found"});
              return;
            } else if (err) {
              sendJsonResponse(res, 404, err);
              return;
            }
            if (location.reviews && location.reviews.length > 0) {
              review = location.reviews.id(req.params.reviewid);
              if (!review) {
                sendJsonResponse(res,404,{"message": "Review ID not Found"});
              } else {
                response = {
                  location: {
                    name: location.name,
                    id: req.params.locationid
                  },
                  review: review
                };
                sendJsonResponse(res, 200, response);
              }
            } else {
              sendJsonResponse(res, 404, {"message": "No reviews found"});
            }
        }
      );
  } else {
    sendJsonResponse(res, 404, {"message":"Both location ID ans d Review ID are required"});
  }
};
module.exports.reviewsUpdateOne = function(req,res) {};
module.exports.reviewsDeleteOne = function(req,res) {};