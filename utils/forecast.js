const request = require('request');

//date format= yyyy-mm-dd/yyyy-mm-dd
const forecast = (address = '', callback) => {
    // const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encodeURIComponent(address) +'/2023-07-29/2023-08-01?unitGroup=us&key=5ANJVUG57KK9JRG5FHNU8NEXP&contentType=json'
    // const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encodeURI(address) + '/' + encodeURI(date1) + '?unitGroup=us&key=5ANJVUG57KK9JRG5FHNU8NEXP&contentType=json'
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encodeURIComponent(address) + '?unitGroup=metric&key=5ANJVUG57KK9JRG5FHNU8NEXP&contentType=json'
    
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Network connectivity', undefined)
        } //else if(response.body.error){
        //     callback("something wrong in the api link")
        // }
        else{
            callback(undefined, {
                place: response.body.resolvedAddress,
                inputAddress: response.body.address,
                timeZone: response.body.timezone,
                // temperature: 'Current temp is ' + response.body.current_weather.temperature + 
                // ' degrees out and rain probability is ' + response.body.hourly.precipitation_probability[21] + '%',
                // current_weather: response.body.current_weather
                today_weather_description: response.body.days[0].description + ' It is currently ' + response.body.days[0].temp + ' degree out.',
                // current_weather1: response.body.currentConditions,
                // current_temp: response.body.days[0].temp
            })
        }
    })
}


module.exports = forecast