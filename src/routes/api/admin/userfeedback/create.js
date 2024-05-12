const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');
const Stations = mongoose.model('Stations');
const responseHandler = require('@helpers/responseHandler');
module.exports = async (req, res) => {
  try {
    const { email, comment, stationId, rating } = req.body;
    console.log(req.body, "req.body");
    const station = await Stations
      .findById(stationId)
      .exec();
    console.log(station, "jkjhkj");
    if (!station) {
      return responseHandler.handleErrorResponse(res, 404, 'Station not found');
    }
    const feedback = new Feedback({
      email,
      comment,
      stationId,
      rating,
    });
    await feedback.save();
    return responseHandler.handleSuccessResponse(res, 'Feedback submitted', 201);

  }
  catch (error) {
    console.error(error);
    return responseHandler.handleErrorResponse(res, 500, 'Internal server error');
  }
}
