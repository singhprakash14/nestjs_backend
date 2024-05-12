const mongoose = require('mongoose')
const Stations = mongoose.model('Stations')
const ParkingOptions = mongoose.model('ParkingOptions');
const responseHandler = require('@helpers/responseHandler');
module.exports = async (req, res) => {
  try {
    const { stationId } = req.query
    const station = await Stations.findById(stationId)
    if (!station) return responseHandler.handleErrorResponse(res, 404, 'Station not found');
    const parkingOptions = await ParkingOptions.find({ stationId: stationId })
    if (!parkingOptions) return responseHandler.handleErrorResponse(res, 404, 'No Parking Options Found')
    return responseHandler.handleSuccessObject(res, parkingOptions)
  }
  catch (err) {
    console.log('unknown error', err)
    return responseHandler.handleErrorResponse(res, 500, "internal server error")
  }

}