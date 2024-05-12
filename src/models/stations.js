const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  stringaddress: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: false
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
    index: '2dsphere' // Define 2dsphere index directly in the schema
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  road: {
    type: String,
    required: false
  }
});

const stationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: locationSchema, // Use the modified locationSchema
  capacity: {
    type: String,
    required: false
  },
  orgName: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  stationImg: {
    type: String,
    required: false
  }
}, { timestamps: true });

mongoose.model('Stations', stationSchema);
