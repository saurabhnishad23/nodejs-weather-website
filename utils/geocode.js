const request = require('request');

// const latitude = Number(console.log(process.argv[2]))
// const longitude = Number(console.log(process.argv[3]))

const geocode = (latitude, longitude, callback) => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(latitude) + '&longitude=' + encodeURIComponent(longitude) + '&hourly=temperature_2m,precipitation_probability,rain,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&forecast_days=1'

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Network connectivity', undefined)
        } else if(response.body.error){
            callback("Value of type 'Float' required for key 'latitude' and 'longitude'.")
        }
        else{
            callback(undefined, {
            
                timeZone: response.body.timezone,
                temperature: 'Current temp is ' + response.body.current_weather.temperature + 
                ' degrees out and rain probability is ' + response.body.hourly.precipitation_probability[21] + '%',
                current_weather: response.body.current_weather
            })
        }
    })
}

module.exports = geocode