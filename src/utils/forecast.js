const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0d3bbc315fad18a209f414289823e848&query='+ longitude +','+ latitude +'&units=f'

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
         }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions + '. It is currently '+ response.body.current.temperature + ' degress out. It feels like ' + response.body.current.feelslike + " degress out.")
        }           
    })
}

module.exports = forecast