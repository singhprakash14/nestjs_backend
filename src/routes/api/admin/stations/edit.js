const mongoose = require('mongoose');
const Stations = mongoose.model('Stations');
const responseHandler = require('@helpers/responseHandler');
const { storeImage } = require('@helpers/utils');
const fs = require('fs');
module.exports = async (req, res) => {
  const id = req.params.id;
  const { name, stringaddress, state, city, country, country_code, lat, lng, postalCode, description, orgName, capacity } = req.body;
  console.log("iii=>", req.body)
  const station = await Stations.findById(id)
  if (!station) {
    return responseHandler.handleErrorResponse(res, 404, 'Station not found');
  }
  const stationObj = {
    name: name || station.name,
    location: {
      stringaddress: stringaddress || station.location.stringaddress,
      state: state || station.location.state,
      city: city || station.location.city,
      country: country || station.location.country,
      countryCode: country_code || station.location.countryCode,
      coordinates: (lng !== undefined && lng !== undefined) ? [parseFloat(lng), parseFloat(lat)] : station.location.coordinates,
      postalCode: postalCode || station.location.postalCode
    },
    description: description || station.description,
    orgName: orgName || station.orgName,
    capacity: capacity || station.capacity
  };
  if (req.file) {
    const imageURL = await storeImage('uploads/stations', req.file);
    if (fs.stationImg) {
      fs.rmSync(station.stationImg, { recursive: true });
    }
    stationObj['stationImg'] = imageURL;

  }
  const updatedStation = await Stations.findByIdAndUpdate(id, stationObj, { new: true });
  if (!updatedStation) {
    return responseHandler.handleErrorResponse(res, 400, 'Station not updated');
  }
  return responseHandler.handleSuccessResponse(res, 'Station updated successfully');
}