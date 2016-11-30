var mongoose = require('mongoose');
// Define Opening Times subdocument before location subdocument
var openingTimeSchema = new mongoose.Schema({
  days: {type: String, required: true},
  opening: {type: String},
  closing: String,
  closed: {type: Boolean, required: true}
});

// Define Reviews subdocument before location subdocument
var reviewSchema = new mongoose.Schema({
  author: String,
  rating: {type: Number, required: true, min:0, max:0},
  reviewTex: String,
  createdOn: {type: Date, "default": Date.now}

});
//Define location Schema
var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: String,
  rating: {type: Number, "default": 0, min: 0, max: 5},
  facilities: [String],
  coords: {type: [Number], index: '2dsphere'},
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

//Compile the Model from the Schema
mongoose.model('Location', locationSchema);
