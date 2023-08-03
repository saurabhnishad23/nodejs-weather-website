const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');


const app = express();
const port = process.env.PORT || 4000

// Define Path for Express config
const publicDirecetoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirecetoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sunny'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sunny'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sunny'
    })
})

app.get('/help/*', (req, res) => {
    res.render('data',{
        title: 'Unknown',
        name: 'Sunny',
        errorMessage: 'Help Article not found'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address'
        })
    }
    // const address = (req.query.address);
    forecast(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }
        res.send({
            // forecast: today_weather_description,
            // location: place
            current_weather: data
        })
    })

 
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide the search term'})
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Error, page not found'
    })
})


app.listen(port, () => {
    console.log('Server is start on port ' + port)
})