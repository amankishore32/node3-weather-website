const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialDirPath = path.join(__dirname, '../templates/partials')


// Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialDirPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Aman Kishore'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About US",
        name: 'Aman Kishore'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message goes here',
        title: 'Help page',
        name: 'Aman Kishore'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if(!req.query.address){
        return res.send({
            error: 'No address available.'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {

        if(error)
        {
            return res.send({
                error: 'Error: ' + error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error){
                return res.send({
                    error: 'Error: ' + error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        err_msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        err_msg: 'Page not found. 404 Error.'
    })
})

app.listen(port, () => {
    console.log('Server started at port ' + port + '.')
})