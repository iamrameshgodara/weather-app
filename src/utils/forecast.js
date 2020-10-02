const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=03068916469ea5d73341b1d49cedbbd9&query=' + latitude + ',' + longitude + '& units = m '
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to wather app!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. And Humidity is ' + body.current.humidity + '%.')

        }

    })

}
module.exports = forecast