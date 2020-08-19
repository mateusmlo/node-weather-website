# node-weather-website

Simple web application developed using Node.js, Express and handlebars template engine. It was developed with the help of Andrew Mead's amazing [The Complete Node.js Developer Course (3rd Edition)](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/), but it's important to note this is not an exact copy of what was presented in the course as I added my own touch to several parts of the code to try new APIs and JS features. It is not complete, the UI is very raw and I most likely won't change this since I'm currently studying back-end development, but anyone's free to fork it and transform it into a nice UX. I'll be commiting more advanced apps as my knowledge grows.

## To see it in action:
Simply visit the app's Heroku page @ https://mmlo-weather-app.herokuapp.com

There is a major thing you need to setup in order for it to run on your machine.
## Enviroment variables:
This project uses dotenv as a dev dependency, which means you will have to provide your own API keys through a .env file at the root of the project. The file should just contain
```
WEATHERSTACK_KEY = YOUR_API_KEY
MAPBOX_TOKEN = YOUR_API_TOKEN
```
You can grab the keys by signing up to [Mapbox](https://www.mapbox.com) and [Weatherstack](https://weatherstack.com).

## Running it locally
I pretend to update this in the future with support to development and production environment since the current setup is pretty much a workaround by commenting out the lines requiring dotenv information at *src/utils/geocode.js:1* and *src/utils/forecast.js:1*. This is to prevent the app from crashing on Heroku due to requiring what is not there. 
Anyway, to run it without watching for changes:
```
yarn start
```
Or if you use npm:
```
npm start
```
To watch for changes using nodemon:
```
yarn ndm:dev
```
Or
```
npm ndm:dev
```
Note this will also watch for changes made in the .hbs files under /templates.

You may want to remove the -L flag on the "ndm:dev" script since this is something I had to add for nodemon to track changes using WSL Ubuntu. It may work fine without it for you.

##TODO:
- [ ] Add option to retrieve temperature in Farenheits.
- [ ] Add some more content to some of the pages
- [ ] Show more weather information
