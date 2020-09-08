const geocode = (address, cb) => {
	const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${process.env.MAPBOX_TOKEN}`

	request({ uri: URL, json: true }, (err, { body }) => {
		if (err) return cb('Unable to connect to location services.', undefined)

		if (body.features.length === 0)
			return cb('Unable to find location.', undefined)

		const locationData = body.features[0]

		cb(undefined, {
			latitude: locationData.center[1],
			longitude: locationData.center[0],
			location: locationData.place_name,
		})
	})
}
