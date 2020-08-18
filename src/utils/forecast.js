require('dotenv/config')
const request = require('postman-request')

const forecast = (latitude, longitude, cb) => {
	const url = `http://api.weatherstack.com/current?access_key=${
		process.env.WEATHERSTACK_KEY
	}&query=${Number(latitude)},${Number(longitude)}&unit=c`

	//since res is already passed in as an argument we can just destructure its body property which we use throughout the code
	request({ url, json: true }, (err, { body }) => {
		const currentData = body.current

		if (err) cb('Unable to connect to weather services.', undefined)
		if (body.error || currentData === undefined)
			cb('Invalid coordinates provided.', undefined)

		cb(undefined, {
			weather_descriptions: currentData.weather_descriptions[0],
			temperature: currentData.temperature,
			feelslike: currentData.feelslike,
		})
	})
}

module.exports = forecast
