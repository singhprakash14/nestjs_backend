const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
    default: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});
mongoose.model('Feedback', FeedbackSchema);
