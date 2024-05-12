const responseHandler = require('@helpers/responseHandler')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { storeImage } = require('@helpers/utils')


const Users = mongoose.model('Users')
const Stations = mongoose.model('Stations')


async function register(req, res) {
  try {
    const { firstName, lastName, email, password, orgName, stationName, phone, fil } = req.body;
    // Check if user already exists
    const emailExists = await Users.findOne({ email: email });
    if (emailExists) {
      return responseHandler.handleErrorResponse(res, 400, 'Email already exists')
    }
    const stationExists = await Stations.findOne({ name: stationName })
    if (stationExists) return responseHandler.handleErrorResponse(res, 400, 'station already exsits')

    const station = new Stations({
      name: stationName,
      orgName: orgName,
    });
    const savedStation = await station.save();
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const userObj = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: 'admin',
      stationId: savedStation._id,
    }
    if (req.file) {
      const imageURL = await storeImage('uploads/usersProfile', req.file)
      userObj['profileImg'] = imageURL
    }

    const user = new Users(userObj);
    try {

      const savedUser = await user.save();
      console.log('savedUser', savedUser)
      station.owenerId = savedUser._id;
      await station.save()
      return responseHandler.handleSuccessResponse(res, 'User created successfully')
    } catch (error) {
      return responseHandler.handleErrorResponse(res, 500, error.message)
    }
  } catch (error) {
    console.log('unknow error', error)
    return responseHandler.handleErrorResponse(res, 500, error.message)
  }
}

module.exports = register;