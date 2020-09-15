const path = require('path')
const express = require('express')
const hbs = require('hbs')
const log = console.log

// import util modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const PORT = process.env.PORT || 3000

// setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static assets to serve
app.use(express.static(publicDirPath))

// setup routes
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Mateus M.',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Mateus M.',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Mateus M.',
		helpText: "Here's how we can help you (example page only)",
	})
})

app.get('/weather', async (req, res) => {
	const address = req.query.address

	try {
		// properties based on obj returned by Mapbox API
		const locationData = await geocode(address)

		const latitude = locationData.center[1],
			longitude = locationData.center[0],
			location = locationData.place_name

		// properties based on obj returned by Weatherstack API
		const weatherData = await forecast(latitude, longitude),
			weather_descriptions = weatherData.weather_descriptions[0],
			temperature = weatherData.temperature,
			feelslike = weatherData.feelslike

		res.send({
			location,
			weather_descriptions,
			temperature,
			feelslike,
		})
	} catch (err) {
		log(err)
	}
})

app.get('*', (req, res) => {
	res.status(404).render('404', {
		title: 'Page not found',
		name: 'Mateus M.',
		error: 'Page not found! 😕',
	})
})

app.listen(PORT, () => {
	log(`⚡ Server is up and running at http://localhost:${PORT}`)
})
