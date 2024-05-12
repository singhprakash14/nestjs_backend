// middleware/jwtauth.js
const jwt = require('jsonwebtoken');
const responseHandler = require('@helpers/responseHandler');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }

  return null
}
const authenticateToken = (req, res, next) => {
  const token = getTokenFromHeaders(req)

  if (!token) {
    return responseHandler.handleErrorResponse(res, 401, 'Bearer-Token is missing');
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS256' })
    req.user = decode.user;
    next();
  }
  catch (err) {
    console.log('err', err)
    return responseHandler.handleErrorResponse(res, 401, 'Invalid Token');
  }
};

const adminAuthenticateToken = (req, res, next) => {
  // Assuming you have a role attribute in your JWT payload
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return responseHandler.handleErrorResponse(res, 403, 'Unauthorized. Admin access required');
  }
};

module.exports = {
  authenticateToken,
  adminAuthenticateToken,
};