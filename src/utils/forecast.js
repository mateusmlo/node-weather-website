//require('dotenv/config')
const axios = require('axios').default
const log = console.log

const forecast = async (latitude, longitude) => {
	try {
		const URL = `http://api.weatherstack.com/current?access_key=${
			process.env.WEATHERSTACK_KEY
		}&query=${Number(latitude)},${Number(longitude)}&unit=c`

		const response = await axios.get(URL)
		const { data } = response

		const currentData = data.current

		if (data.error || currentData === undefined) {
			throw new Error('Invalid coordinates provided.')
		}

		return currentData
	} catch (err) {
		log(err)
	}
}

module.exports = forecast
