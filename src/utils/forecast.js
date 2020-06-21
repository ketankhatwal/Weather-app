const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e8f81ab7ef1de8da7995553e831cfbd7&query=' + latitude + "," + longitude

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to use weather service", undefined)
        } else if ( body.error) {
            callback("Wrong coordinates", undefined)
        } else {
            callback(undefined, "It is currently " + body.current.temperature.toString() + " degrees out. There is a " + body.current.precip.toString() + "\% chance of rain")
        }
    })
}

module.exports = forecast