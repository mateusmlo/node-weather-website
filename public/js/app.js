const log = console.log

console.log('Client side JS file is loaded')

const weatherForm = document.getElementById('weather-form'),
	search = document.getElementById('search-input'),
	msgOne = document.getElementById('msg-1'),
	msgTwo = document.getElementById('msg-2')

const getWeather = async (location) => {
	try {
		const res = await fetch(
			`http://127.0.0.1:3333/weather?address=${location}`
		)

		const data = await res.json()

		if (data.err) {
			throw new Error(data.err)
		}

		if (!data.location) {
			throw new Error(`No location was provided`)
		}

		const forecast = Object.assign({}, data)

		const {
			location: userLocation,
			weather_descriptions,
			temperature,
			feelslike,
		} = forecast

		log(forecast)

		msgOne.textContent = userLocation
		msgTwo.textContent = `[${weather_descriptions}] ${temperature}°C. It feels like ${feelslike}°C.`
	} catch (err) {
		msgOne.textContent = err
		msgTwo.textContent = ''
		log(err)
	}
}

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value
	getWeather(location)
})
