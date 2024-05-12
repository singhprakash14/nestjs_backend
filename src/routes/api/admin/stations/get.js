const mongoose = require('mongoose');
const Stations = mongoose.model('Stations');
const ParkingOptions = mongoose.model('ParkingOptions');
const responseHandler = require('@helpers/responseHandler');
const get = async (req, res) => {
  try {
    const stations = await Stations.find();
    return responseHandler.handleSuccessObject(res, stations);
  } catch (error) {
    console.log('unknow error', error);
    return responseHandler.handleErrorResponse(res, 500, error.message);
  }
}
const getById = async (req, res) => {
  try {
    let data = {}
    const station = await Stations.findById(req.params.id);
    if (!station) {
      return responseHandler.handleErrorResponse(res, 404, 'Station not found');
    }
    const parkingOptions = await ParkingOptions.find({ stationId: station._id });
    console.log(parkingOptions);
    data = { ...station._doc }
    data.parkingOptions = parkingOptions || [];
    console.log(data)
    return responseHandler.handleSuccessObject(res, data);
  } catch (error) {
    console.log('unknow error', error);
    return responseHandler.handleErrorResponse(res, 500, error.message);
  }
}

const getStationByRadius = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    // Convert radius to meters (if it's in kilometers)
    const radiusInMeters = parseFloat(radius) * 1000;

    // Perform the aggregation pipeline using $geoNear
    const stations = await Stations.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)] // User coordinates
          },
          distanceField: "distance",
          maxDistance: radiusInMeters,
          spherical: true
        }
      }
    ]);
    if (stations && stations.length > 0) {
      return responseHandler.handleSuccessObject(res, stations);
    }
    return responseHandler.handleErrorResponse(res, 404, 'No stations found');
  } catch (error) {
    console.error(error);
    return responseHandler.handleErrorResponse(res, 500, 'Internal Server Error');
  }
};



exports.getById = getById;
exports.get = get;
exports.getStationByRadius = getStationByRadius;
