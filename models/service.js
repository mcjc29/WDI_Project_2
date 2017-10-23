const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const serviceSchema = new mongoose.Schema({
  name: String,
  address: {
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    postcode: { type: String, required: true }
  },
  image: { type: String, required: true },
  website: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  //overall rating
  rating: [{
    type: Number, required: true
  }, {
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }],
  comments: [commentSchema]
});

serviceSchema.methods.belongsTo = function serviceBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Service', serviceSchema);
