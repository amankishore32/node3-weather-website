const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8d290dbf6c6dd7ccd8799bfe0f374836/' + latitude + ',' + longitude + '?units=si'

    request({ url : url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + " temprature out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}


module.exports = forecast