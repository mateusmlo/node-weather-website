const weatherForm = document.getElementById('weather-form'),
	search = document.getElementById('search-input'),
	msgOne = document.getElementById('msg-1'),
	msgTwo = document.getElementById('msg-2')

const getWeather = async (location) => {
	try {
		if (location.length === 0) throw new Error('No location was provided.')

		const res = await fetch(`/weather?address=${location}`)

		const data = await res.json()
		// if invalid location is provided all props of the returned data object
		// are undefined, so we catch this
		if (data.temperature === undefined) {
			throw new Error('Invalid location provided')
		}

		const forecast = Object.assign({}, data)

		const {
			location: userLocation,
			weather_descriptions,
			temperature,
			feelslike,
		} = forecast

		msgOne.textContent = userLocation
		msgTwo.textContent = `[${weather_descriptions}] ${temperature}°C. It feels like ${feelslike}°C.`
	} catch (err) {
		msgOne.textContent = err
		msgTwo.textContent = ''
	}
}

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value
	getWeather(location)
})
