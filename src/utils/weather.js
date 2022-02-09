const axios = require("axios").default;
const getweather = (
  { location, latitude = 0, logitude = 0 } = {},
  callback
) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d63879a869b174b08d0aa668050e7bbd&query=" +
    latitude +
    "," +
    logitude;
  axios
    .get(url)
    .then((response) => {
      if (response.data.error) {
        callback(
          {
            msg: url,
          },
          undefined
        );
      } else {
        callback(undefined, {
          desc: response.data.current.weather_descriptions,
          temp: response.data.current.temperature,
          feellike: response.data.current.feelslike,
          precep: response.data.current.precip,
          location:
            response.data.location.name + ", " + response.data.location.country,
        });
      }
    })
    .catch(() => {
      callback("Unable to connect to weather services please try later!");
    });
};

module.exports = getweather;
