const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');
const responseHandler = require('@helpers/responseHandler');
module.exports = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    return responseHandler.handleSuccessObject(res, feedback);
  } catch (error) {
    console.log('unknow error', error);
    return responseHandler.handleErrorResponse(res, 500, error.message);
  }
}
