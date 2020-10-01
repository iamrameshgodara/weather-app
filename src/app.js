const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ramesh Godara'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ramesh Godara'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        message: 'Hey!  Now you can search your area\'s weather.',
        name: 'Ramesh Godara'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }
    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        //we provide empty object = {} if no object is passed in fun
        if (error) {
            return res.send({
                error: 'Unable to find Location! try again'
            })
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error: 'Sorry! weather details are not available'
                })
            }
            res.send({
                forecast: forcastData,
                location,
                address


            })
        })

    })
})




app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search value'
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ramesh Godara',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ramesh Godara',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
