const mongoose = require('mongoose');
const parkingOptionsSchema = new mongoose.Schema({
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stations',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [1, 2, 3, 4],
    default: 1
  },
  capacity: {
    type: Number,
    required: true
  },
  occupied: {
    type: Number,
    required: true
  }
});
mongoose.model('ParkingOptions', parkingOptionsSchema);

// const parkingOptionsHmap = {
//   1: "Car",
//   2: "EV",
//   3: "Bicycle",
//   4: "Disabled"
// }