const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const accessKey = "2f612c92fdb01deda67086607e21d6d6";
	const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`;

	request({ url, json: true }, (error, response, body) => {
		if (error || response.statusCode !== 200) {
			callback("Unable to connect to weather service!", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions[0]} It is currently ${
					body.current.temperature
				} degress out. There is a ${
					body.current.precip * 100
				}% chance of rain.`,
			);
		}
	});
};

module.exports = forecast;
