const mongoose = require('mongoose');
const Stations = mongoose.model('Stations');
const ParkingOptions = mongoose.model('ParkingOptions');
const responseHandler = require('@helpers/responseHandler');
const get = async (req, res) => {
  try {
    const { type } = req.query;
    if (type) {
      const stations = await ParkingOptions.find({ type }).populate('stationId');
      const filteredStations = stations.filter(station => station.stationId);
      return responseHandler.handleSuccessObject(res, filteredStations);
    }
    else {
      const stations = await Stations.find();
      return responseHandler.handleSuccessObject(res, stations);
    }
  } catch (error) {
    console.log('unknow error', error);
    return responseHandler.handleErrorResponse(res, 500, error.message);
  }
}
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Stations.findById(id);
    return responseHandler.handleSuccessObject(res, station);
  } catch (error) {
    console.log('unknow error', error);
    return responseHandler.handleErrorResponse(res, 500, error.message);
  }
}
exports.get = get;
exports.getById = getById;