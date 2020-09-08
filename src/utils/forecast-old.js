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

		const { weather_descriptions, temperature, feelslike } = currentData

		cb(undefined, {
			weather_descriptions: weather_descriptions[0],
			temperature,
			feelslike,
		})
	})
}
