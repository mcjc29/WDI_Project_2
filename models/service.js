const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const ratingSchema = new mongoose.Schema({
  dignity: {type: String },
  advice: {type: String },
  facilities: {type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

ratingSchema.methods.belongsTo = function ratingBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};
//
// const categorySchema = new mongoose.Schema({
//   sexual: []
//   domestic:
//   pregnancy:
// });

const serviceSchema = new mongoose.Schema({
  name: String,
  category: String,
  categoryIcon: String,
  address: {
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    postcode: { type: String, required: true }
  },
  image: { type: String, required: true },
  website: { type: String, required: true },
  number: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
  ratings: [ratingSchema],
  averageRatings: []
});

serviceSchema.methods.belongsTo = function serviceBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Service', serviceSchema);
