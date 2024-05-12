const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['standard', 'admin', 'superAdmin'],
    required: true,
  },
  CompanyName: {
    type: String,
    require: true
  },
  profileImg: { type: String, require: false },
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stations',
  }
});
mongoose.model('Users', userSchema);