const mongoose = require('mongoose');
const ParkingOptions = mongoose.model('ParkingOptions');
const responseHandler = require('@helpers/responseHandler');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { stationId, capacity, occupied } = req.body;

    // Find the parking option by its ID and stationId
    const parkingOption = await ParkingOptions.findOne({ _id: id, stationId: stationId });
    if (!parkingOption) {
      return responseHandler.handleErrorResponse(res, 404, 'ParkingOption not found');
    }

    // Update the fields of the parking option
    parkingOption.capacity = capacity || parkingOption.capacity;
    parkingOption.occupied = occupied || parkingOption.occupied;

    // Save the updated parking option
    await parkingOption.save();

    return responseHandler.handleSuccessResponse(res, 'Parking option updated successfully', 200);
  } catch (error) {
    console.error(error);
    return responseHandler.handleErrorResponse(res, 500, 'Internal server error');
  }
};
