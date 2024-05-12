
const sendResponse = (res, statusCode, data, additionalData = {}) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    status: statusCode,
    ...data,
    ...additionalData,
  };

  // Logger to log this response
  console.table(response);

  res.status(statusCode).json(response);
};

exports.handleErrorResponse = (res, errorCode, errorMessage) => {
  sendResponse(res, errorCode, { message: errorMessage });
};

exports.handleErrorObject = (res, errorCode, errorObject) => {
  sendResponse(res, errorCode, { errors: errorObject });
};

exports.handleSuccessResponse = (res, successMessage, statusCode = 200) => {
  sendResponse(res, statusCode, { message: successMessage });
};

exports.handleSuccessCreated = (res, successMessage) => {
  exports.handleSuccessResponse(res, successMessage, 201);
};

exports.handleException = (res, err) => {
  const statusCode = err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  const exceptionObject = {
    success: false,
    status: statusCode,
    message: err.message,
  };

  if (!isProduction) {
    exceptionObject.error = err;
  }

  sendResponse(res, statusCode, exceptionObject);
};

exports.handleSuccessObject = (res, responseObject, additionalData = {}) => {
  sendResponse(res, 200, { data: responseObject, ...additionalData });
};

exports.handleSuccessWithMessageObject = (res, responseObject, message) => {
  sendResponse(res, 200, { data: responseObject, message });
};