const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '..', 'public')
const viewPath = path.join(__dirname, "..", 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static drectory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Ketan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Ketan"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Ketan"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    // console.log("Error", error)
    // console.log("Data", data)
    if (error) {
        return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData, humidity) => {
        if (error) {
            return res.send({ error })
        }
        // console.log('Error', error)
        res.send({
            forecast: forecastData,
            location,
            humidity,
            address: req.query.address    
        })
        //console.log(location)
        //console.log(forecastData)
    })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        error: "Help Article not found",
        name: "Ketan"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        error: "Page Not Found",
        name: "Ketan"
    })
})

app.listen(port, () => {
    console.log("Server is running in port " + port)
})