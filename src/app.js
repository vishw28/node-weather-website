const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Vishw Vajaria'
    })
})

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        title: "About",
        image: './img/64AC7D34-1914-4677-9728-D2946A99509E.JPG',
        name: "Vishw Vajaria"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help",
        name: "Vishw Vajaria"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, geocodeData) => {
        if(error){
            return res.send({
                error: error
            })
        }
         forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: geocodeData.location
            })
          })
    })

    // res.send({
    //     forecast: '50 degrees outside',
    //     location: 'Cherry Hill',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Help article not found!',
        name: 'Vishw Vajaria'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Page Not Found!',
        name: 'Vishw Vajaria'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})