const mongoose = require('mongoose');
const Stations = mongoose.model('Stations');
const responseHandler = require('@helpers/responseHandler');
module.exports = async (req, res) => {
  const id = req.params.id;
  console.log("id", id)
  const station = await Stations.findById(id)
  console.log("station", station)
  if (!station) {
    return responseHandler.handleErrorResponse(res, 404, 'Station not found');
  }
  const stationDelete = await Stations.findByIdAndDelete(id);
  if (!stationDelete) {
    return responseHandler.handleErrorResponse(res, 400, 'Station not deleted');
  }
  return responseHandler.handleSuccessResponse(res, 'Station deleted successfully');
}