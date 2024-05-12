// middleware/checkParameters.js
const checkParameters = (requiredParams) => {
  return (req, res, next) => {
    const missingParams = [];

    // Check if each required parameter exists in the request
    requiredParams.forEach(param => {
      if (!req.body[param] && !req.query[param]) {
        missingParams.push(param);
      }
    });

    if (missingParams.length > 0) {
      const errorMessage = `Missing required parameters: ${missingParams.join(', ')}`;
      return responseHandler.handleErrorResponse(res, 400, errorMessage);
    }

    // All required parameters exist, proceed to the next middleware/route handler
    next();
  };
};

module.exports = checkParameters;

