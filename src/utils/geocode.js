//require('dotenv/config')
const axios = require('axios').default
const log = console.log

const geocode = async (address) => {
	try {
		const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
			address
		)}.json?access_token=${process.env.MAPBOX_TOKEN}`

		const response = await axios.get(URL)
		const { data } = response

		const locationData = data.features[0]

		return locationData
	} catch (err) {
		log(err)
	}
}

module.exports = geocode
