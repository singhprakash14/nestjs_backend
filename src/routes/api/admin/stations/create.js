const mongoose = require('mongoose');
const Stations = mongoose.model('Stations');
const responseHandler = require('@helpers/responseHandler');
const { storeImage } = require('@helpers/utils')

const create = async (req, res) => {
  try {
    const { name, stringaddress, state, city, country, country_code, lat, lng, postalCode, description, orgName, capacity } = req.body;
    const stationObj = {
      name,
      location: {
        stringaddress,
        state,
        city,
        country,
        countryCode: country_code,
        coordinates: [parseFloat(lng), parseFloat(lat)], // Ensure coordinates are parsed as floats
        postalCode
      },
      description,
      orgName,
      capacity
    };
    console.log('stationObj', stationObj);
    if (req.file) {
      const imageURL = await storeImage('uploads/stations/', req.file);
      stationObj['stationImg'] = imageURL;
    }
    const station = new Stations(stationObj);

    await station.save();
    return responseHandler.handleSuccessResponse(res, 'Station created successfully');
  } catch (error) {
    console.log('unknow error', error);
    return responseHandler.handleErrorResponse(res, 500, error.message);
  }
};
module.exports = create;