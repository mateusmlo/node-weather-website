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
		helpText: "Here's how we can help you",
	})
})

app.get('/weather', (req, res) => {
	const address = req.query.address

	if (!address) {
		return res.send({
			error: 'You must provide an address',
		})
	}

	geocode(address, (err, { latitude, longitude, location } = {}) => {
		if (err) {
			return res.send({ err })
		}

		forecast(
			latitude,
			longitude,
			(err, { weather_descriptions, temperature, feelslike }) => {
				if (err) {
					return res.send({ err })
				}

				res.send({
					location,
					weather_descriptions,
					temperature,
					feelslike,
				})
			}
		)
	})
})

app.get('/help/*', (req, res) => {
	res.status(404).render('404', {
		title: 'Page not found',
		name: 'Mateus M.',
		error: 'Help article not found',
	})
})

app.get('*', (req, res) => {
	res.status(404).render('404', {
		title: 'Page not found',
		name: 'Mateus M.',
		error: 'Page not found! 😕',
	})
})

app.listen(3333, () => {
	log(`⚡ Server is up and running at http://localhost:3333`)
})
