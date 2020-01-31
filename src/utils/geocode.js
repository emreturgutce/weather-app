const request = require('request');

const geocode = (adress, callback) => {
  const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoiZW1vdHJlIiwiYSI6ImNrNjFhdDJicTAxZTIzbXExYzQ3dmZ3dmYifQ.w4EcSRxYppRRtyUDul1HdA&limit=1`;
  request({ url: urlGeo, json: true }, (error, response) => {
    if (error) console.log(error);
    callback({
      place: response.body.features[0].place_name,
      longtitude: response.body.features[0].center[0],
      latitude: response.body.features[0].center[1]
    });
  });
};

const weather = (latitude, longtitude, callback) => {
  const urlWth = `https://api.darksky.net/forecast/26ffbe7fa8e549e5cabe4cd8edfa3c99/${latitude},${longtitude}?units=si`;
  request({ url: urlWth, json: true }, (error, response) => {
    if (error) console.log(error);
    callback(response);
  });
};

module.exports = {
  geocode,
  weather
};
