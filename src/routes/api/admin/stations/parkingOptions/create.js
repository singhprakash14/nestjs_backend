const mongoose = require('mongoose');
const ParkingOptions = mongoose.model('ParkingOptions');
const Stations = mongoose.model('Stations');
const responseHandler = require('@helpers/responseHandler');
module.exports = async (req, res) => {
  try {
    const { stationId, type, capacity, occupied } = req.body;
    const station = await Stations.findById(stationId);
    if (!station) {
      return responseHandler.handleErrorResponse(res, 404, 'Station not found');
    }
    const parkingOptions = new ParkingOptions({
      stationId,
      type,
      capacity,
      occupied
    });
    await parkingOptions.save();
    await station.save();
    return responseHandler.handleSuccessResponse(res, 'Parking option created successfully', 201)
  } catch (error) {
    return responseHandler.handleErrorResponse(res, 500, 'Internal server error');
  }
};